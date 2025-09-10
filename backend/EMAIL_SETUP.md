# Email Configuration Setup Guide

## 📧 Overview

Your PrinTeeQ application requires email configuration to send password reset emails. This guide will help you set up email functionality using various providers.

## 🚨 Current Issue

The error "Email could not be sent. Please try again later." occurs because your `.env` file contains placeholder values:

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## 🛠️ Quick Setup

### Option 1: Use the Setup Script (Recommended)

Run the interactive setup script:

```bash
node setup-email.js
```

This script will guide you through the configuration process.

### Option 2: Manual Configuration

Update your `.env` file with actual email credentials:

## 📧 Provider-Specific Instructions

### Gmail (Recommended)

1. **Enable 2-Factor Authentication**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to [App Passwords](https://support.google.com/accounts/answer/185833)
   - Select "Mail" and "Other" (Custom name)
   - Copy the generated 16-character password

3. **Update .env file:**
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-actual-gmail@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

### Outlook/Hotmail

1. **Update .env file:**
   ```
   EMAIL_HOST=smtp-mail.outlook.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@outlook.com
   EMAIL_PASS=your-actual-password
   ```

### Yahoo Mail

1. **Generate App Password**
   - Go to Yahoo Account Security
   - Enable 2-Step Verification
   - Generate App Password

2. **Update .env file:**
   ```
   EMAIL_HOST=smtp.mail.yahoo.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@yahoo.com
   EMAIL_PASS=your-app-password
   ```

### Custom SMTP Provider

```
EMAIL_HOST=your-smtp-server.com
EMAIL_PORT=587
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-password
```

## 🔧 Testing the Configuration

After updating your `.env` file:

1. **Restart your server:**
   ```bash
   npm run dev
   ```

2. **Test password reset:**
   - Go to your frontend login page
   - Click "Forgot Password"
   - Enter a valid email address
   - Check if the email is sent successfully

## 🚨 Common Issues & Solutions

### Issue: "Email configuration is incomplete"
**Solution:** Make sure all EMAIL_* variables are set in your `.env` file.

### Issue: "Please update EMAIL_USER and EMAIL_PASS"
**Solution:** Replace placeholder values with actual credentials.

### Issue: "Email authentication failed" (EAUTH)
**Solutions:**
- For Gmail: Use App Password, not regular password
- For Outlook: Make sure 2FA is enabled if required
- Check if username/password are correct

### Issue: "Unable to connect to email server" (ECONNECTION)
**Solutions:**
- Check your internet connection
- Verify SMTP host and port settings
- Some networks block SMTP ports - try a different network

### Issue: Gmail "Less secure app access"
**Solution:** Use App Passwords instead of enabling "Less secure app access" (which is deprecated).

## 🔐 Security Best Practices

1. **Never commit credentials to version control**
2. **Use App Passwords for Gmail** (more secure than regular passwords)
3. **Enable 2-Factor Authentication** on your email account
4. **Rotate passwords regularly**

## 📱 Development vs Production

### Development Mode
If email fails in development, the system will still return the reset URL in the response for testing purposes.

### Production Mode
Email failures will return proper error messages to users without exposing the reset URL.

## 🆘 Still Having Issues?

1. **Check server logs** for detailed error messages
2. **Verify network connectivity** to SMTP servers
3. **Test with different email providers**
4. **Contact your hosting provider** if using shared hosting

## 📋 Environment Variables Reference

```bash
# Required for email functionality
EMAIL_HOST=smtp.gmail.com          # SMTP server hostname
EMAIL_PORT=587                     # SMTP server port (usually 587)
EMAIL_USER=your-email@gmail.com    # Your email address
EMAIL_PASS=your-app-password       # Your email password or app password

# Optional (for password reset links)
CLIENT_URL=http://localhost:3000   # Your frontend URL
NODE_ENV=development               # Environment mode
```

---

**Need help?** Open an issue in the repository or check the server logs for detailed error messages.
