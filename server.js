const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ SECURITY & SEO HEADERS
app.use((req, res, next) => {
  // Security Headers
  res.set("X-UA-Compatible", "IE=edge");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("X-Frame-Options", "SAMEORIGIN");
  res.set("X-XSS-Protection", "1; mode=block");
  res.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");

  // SEO Headers
  res.set("Cache-Control", "public, max-age=3600");

  next();
});

// ✅ STATIC FILES WITH CACHE BUSTING
app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: 31536000, // 1 year for static assets
    etag: false,
    setHeaders: (res, path) => {
      // Cache busting for versioned files
      if (path.endsWith(".html")) {
        res.set("Cache-Control", "public, max-age=3600"); // 1 hour for HTML
      } else if (path.match(/\.(js|css)$/)) {
        res.set("Cache-Control", "public, max-age=31536000, immutable");
      } else if (path.match(/\.(png|jpg|jpeg|gif|svg|ico)$/)) {
        res.set("Cache-Control", "public, max-age=31536000, immutable");
      } else if (path.match(/\.(txt|xml|json)$/)) {
        res.set("Cache-Control", "public, max-age=86400"); // 1 day
        if (path.endsWith(".xml")) {
          res.type("application/xml");
        } else if (path.endsWith(".json")) {
          res.type("application/json");
        } else if (path.endsWith(".txt")) {
          res.type("text/plain");
        }
      }
    },
  }),
);

app.use(
  cors({
    origin: "https://insta-reel-downloader-gamma.vercel.app", // Allow all origins (for testing, adjust in production)
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(express.json());

// ✅ safer URL validation
function isValidInstagramUrl(url) {
  if (!url) return false;
  const cleanUrl = url.split("?")[0];
  return /https?:\/\/(www\.)?instagram\.com\/(reel|p|tv)\/[A-Za-z0-9_-]+/.test(
    cleanUrl,
  );
}

// ✅ path to cookies (YOU MUST ADD THIS FILE)
const COOKIES_PATH = path.join(__dirname, "cookies.txt");

// ✅ EXPLICIT ROUTES FOR SEO FILES
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.sendFile(path.join(__dirname, "public/robots.txt"));
});

app.get("/sitemap.xml", (req, res) => {
  res.type("application/xml");
  res.sendFile(path.join(__dirname, "public/sitemap.xml"));
});

app.get("/manifest.json", (req, res) => {
  res.type("application/manifest+json");
  res.sendFile(path.join(__dirname, "public/manifest.json"));
});

app.get("/.well-known/security.txt", (req, res) => {
  res.type("text/plain");
  res.sendFile(path.join(__dirname, "public/.well-known/security.txt"));
});

// ================= INFO =================
const { spawn } = require("child_process");
app.get("/api/info", (req, res) => {
  const { url } = req.query;

  // Set no-cache for API responses
  res.set("Cache-Control", "no-cache, no-store, must-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");

  if (!isValidInstagramUrl(url)) {
    return res.status(400).json({ error: "Invald Instagram URL" });
  }

  const args = [
    "--cookies",
    COOKIES_PATH,
    "--user-agent",
    "Mozilla/5.0",
    "--no-playlist",
    "--dump-json",
    url,
  ];

  const yt = spawn("./yt-dlp", args);

  let data = "";
  let error = "";

  yt.stdout.on("data", (chunk) => (data += chunk));
  yt.stderr.on("data", (chunk) => (error += chunk));
  yt.on("error", (err) => {
    console.error("SPAWN ERROR:", err.message);
    return res.status(500).json({
      error: "yt-dlp not available",
      detail: err.message,
    });
  });
  yt.on("close", () => {
    if (!data) {
      console.error("INFO ERROR:", error);
      return res.status(500).json({
        error: "Failed to fetch info",
        detail: error.slice(0, 200),
      });
    }

    try {
      const info = JSON.parse(data);

      console.log("THUMB DEBUG:", info.thumbnail); // 👈 DEBUG

      const thumbnail =
        info.thumbnail || info.thumbnails?.[info.thumbnails.length - 1]?.url;

      res.json({
        title: info.title || "Instagram Reel",
        thumbnail: thumbnail
          ? `/api/thumb?url=${encodeURIComponent(thumbnail)}`
          : null,
        duration: info.duration,
        uploader: info.uploader || "Unknown",
        formats: (info.formats || [])
          .filter((f) => f.vcodec !== "none")
          .map((f) => ({
            format_id: f.format_id,
            ext: f.ext,
            resolution: f.resolution || `${f.width}x${f.height}`,
            filesize: f.filesize || f.filesize_approx || null,
          }))
          .slice(-5)
          .reverse(),
      });
    } catch (e) {
      res.status(500).json({ error: "Parsing failed" });
    }
  });
});
app.get("/api/thumb", async (req, res) => {
  try {
    const response = await fetch(req.query.url);
    const buffer = await response.arrayBuffer();

    res.set("Content-Type", "image/jpeg");
    res.send(Buffer.from(buffer));
  } catch (e) {
    res.status(500).send("Thumbnail failed");
  }
});
// ================= DOWNLOAD =================
app.get("/api/download", (req, res) => {
  const { url, format } = req.query;

  // Set no-cache for downloads
  res.set("Cache-Control", "no-cache, no-store, must-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");

  if (!isValidInstagramUrl(url)) {
    return res.status(400).json({ error: "Invalid Instagram URL" });
  }

  const fileName = `reel_${Date.now()}.mp4`;
  const tmpFile = path.join(os.tmpdir(), fileName);

  const formatArg = format ? `-f "${format}"` : "-f bestvideo+bestaudio/best";

  const cmd = `yt-dlp --cookies "${COOKIES_PATH}" --user-agent "Mozilla/5.0" --no-playlist ${formatArg} --merge-output-format mp4 -o "${tmpFile}" "${url}"`;

  exec(cmd, { timeout: 120000 }, (err, stdout, stderr) => {
    if (err) {
      console.error("DOWNLOAD ERROR:", stderr);
      return res.status(500).json({
        error: "Download failed",
        detail: stderr.slice(0, 200),
      });
    }

    if (!fs.existsSync(tmpFile)) {
      return res.status(500).json({ error: "File not found" });
    }

    res.download(tmpFile, fileName, () => {
      fs.unlink(tmpFile, () => {});
    });
  });
});

// ================= START =================
app.listen(PORT, () => {
  console.log(`🔥 Server running: http://localhost:${PORT}`);
});
