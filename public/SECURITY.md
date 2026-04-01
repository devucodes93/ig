# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in IGGrabber, please send an email to **security@iggrabber.com** instead of using the public issue tracker.

Please include:

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Suggested fix (if available)

## Security Headers

IGGrabber implements the following security measures:

### HTTP Security Headers

- **X-Content-Type-Options**: nosniff - Prevents MIME type sniffing
- **X-Frame-Options**: SAMEORIGIN - Prevents clickjacking
- **X-XSS-Protection**: 1; mode=block - Enables XSS protection
- **Referrer-Policy**: strict-origin-when-cross-origin - Controls referrer information
- **Permissions-Policy**: Disables geolocation, microphone, and camera access

### Content Security

- **HTTPS/SSL**: All connections should be encrypted
- **No Sensitive Data**: No cookies, tokens, or user data are stored
- **CORS**: Properly configured to prevent unauthorized access
- **Input Validation**: All Instagram URLs are validated before processing

## Data Privacy

- **No User Tracking**: IGGrabber does not track users
- **No Data Collection**: No personal information is collected or stored
- **No Cookies**: No cookies are set on user machines
- **No Login Required**: Users maintain complete anonymity
- **Temporary Files**: Downloaded files are stored temporarily and deleted automatically

## Third-Party Dependencies

IGGrabber uses:

- **yt-dlp**: Video extraction tool (open source)
- **Express.js**: Web framework
- **Node.js**: Runtime environment

All dependencies are kept up to date to ensure security patches are applied promptly.

## Best Practices

1. Keep your Node.js and npm packages updated
2. Use environment variables for sensitive configuration
3. Deploy with HTTPS/SSL
4. Monitor server logs for suspicious activity
5. Implement rate limiting in production
6. Use a Web Application Firewall (WAF) if possible

## Compliance

IGGrabber respects:

- Instagram's Terms of Service (for personal use only)
- Copyright and intellectual property rights
- GDPR and privacy regulations
- DMCA where applicable

## Updates

This security policy is updated periodically. Check back regularly for changes.

**Last Updated**: April 1, 2026
