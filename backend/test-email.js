const nodemailer = require('nodemailer');
require('dotenv').config({ path: 'C:/Users/HP/Pictures/All/portfolio2/backend/.env' });

async function testGmailConnection() {
  console.log('Testing Gmail connection with new app password...');
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 'undefined');

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.verify();
    console.log('✅ Gmail connection successful! New app password is working.');
    
    // Send a test email
    const testEmail = await transporter.sendMail({
      from: `"Test Email" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'Test Email - Portfolio Contact Form',
      text: 'This is a test email to verify the Gmail app password is working correctly.',
      html: '<p>This is a test email to verify the Gmail app password is working correctly.</p>'
    });
    
    console.log('✅ Test email sent successfully:', testEmail.messageId);
    return true;
  } catch (error) {
    console.error('❌ Gmail connection failed:', error.message);
    return false;
  }
}

testGmailConnection().then((success) => {
  if (success) {
    console.log('🎉 Gmail integration is working! You can now use the contact form with email notifications.');
  } else {
    console.log('⚠️ Gmail integration needs troubleshooting.');
  }
  process.exit(0);
});