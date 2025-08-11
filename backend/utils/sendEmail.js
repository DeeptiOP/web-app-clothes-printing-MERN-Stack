import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  try {
    // Validate email configuration
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email configuration is incomplete. Please check EMAIL_HOST, EMAIL_USER, and EMAIL_PASS in your .env file.');
    }

    // Check for placeholder values
    if (process.env.EMAIL_USER === 'your_email@gmail.com' || process.env.EMAIL_PASS === 'your_app_password') {
      throw new Error('Please update EMAIL_USER and EMAIL_PASS with your actual email credentials in the .env file.');
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Add timeout settings
      connectionTimeout: 60000, // 60 seconds
      greetingTimeout: 30000, // 30 seconds
      socketTimeout: 60000, // 60 seconds
    });

    // Verify transporter configuration
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    // Define email options
    const mailOptions = {
      from: `"PrinTeeQ Support" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    return info;
  } catch (error) {
    console.error('Email sending failed:', error.message);
    throw error;
  }
};

export default sendEmail;
