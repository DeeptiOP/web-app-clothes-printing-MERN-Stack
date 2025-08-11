export const getPasswordResetTemplate = (resetUrl, userEmail) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password - PrinTeeQ</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: #ffffff;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 32px;
                font-weight: bold;
                color: #3B82F6;
                margin-bottom: 10px;
            }
            .title {
                color: #1F2937;
                font-size: 24px;
                margin-bottom: 20px;
            }
            .content {
                margin-bottom: 30px;
            }
            .reset-button {
                display: inline-block;
                background: linear-gradient(135deg, #3B82F6, #1D4ED8);
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                text-align: center;
                margin: 20px 0;
                transition: all 0.3s ease;
            }
            .reset-button:hover {
                background: linear-gradient(135deg, #1D4ED8, #1E40AF);
            }
            .warning {
                background-color: #FEF3C7;
                border-left: 4px solid #F59E0B;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
            }
            .footer {
                text-align: center;
                color: #6B7280;
                font-size: 14px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #E5E7EB;
            }
            .link-text {
                word-break: break-all;
                color: #3B82F6;
                font-size: 14px;
                margin-top: 15px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">PrinTeeQ</div>
                <h1 class="title">Reset Your Password</h1>
            </div>
            
            <div class="content">
                <p>Hello,</p>
                <p>We received a request to reset the password for your PrinTeeQ account associated with <strong>${userEmail}</strong>.</p>
                
                <p>Click the button below to reset your password:</p>
                
                <div style="text-align: center;">
                    <a href="${resetUrl}" class="reset-button">Reset Password</a>
                </div>
                
                <div class="warning">
                    <strong>⚠️ Important:</strong> This link will expire in 10 minutes for security reasons.
                </div>
                
                <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                <div class="link-text">${resetUrl}</div>
                
                <p>If you didn't request this password reset, please ignore this email or contact our support team if you have concerns.</p>
            </div>
            
            <div class="footer">
                <p>This email was sent by PrinTeeQ<br>
                If you have any questions, contact us at <a href="mailto:support@printeeq.com">support@printeeq.com</a></p>
                <p>© 2024 PrinTeeQ. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};
