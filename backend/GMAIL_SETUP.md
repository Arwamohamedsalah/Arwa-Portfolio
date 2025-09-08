# Gmail Email Setup Guide

Follow these steps to configure Gmail for your portfolio contact form:

## 1. Enable Gmail App Passwords

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** in the left sidebar
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the steps to enable 2FA if not already enabled

### Step 2: Generate App Password
1. Go back to **Security** settings
2. Under "Signing in to Google", click **App passwords**
3. Select app: **Mail**
4. Select device: **Other (custom name)**
5. Enter name: **Portfolio Contact Form**
6. Click **Generate**
7. **Copy the 16-character password** (you'll need this for your .env file)

## 2. Configure Environment Variables

Create a `.env` file in your backend directory:

```env
# Environment Configuration
NODE_ENV=development
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/portfolio-contacts

# Email Configuration
EMAIL_USER=arwamohamedsalah05@gmail.com
EMAIL_PASS=your_16_character_app_password_here
ADMIN_EMAIL=arwamohamedsalah05@gmail.com
```

**Important Notes:**
- Use the 16-character App Password, NOT your regular Gmail password
- Keep your App Password secure and don't share it
- The EMAIL_USER should be your Gmail address
- ADMIN_EMAIL is where contact notifications will be sent (can be same as EMAIL_USER)

## 3. Install Dependencies

```bash
cd backend
npm install
```

## 4. Start the Server

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📊 Health check: http://localhost:5000/api/health
📧 Contact API: http://localhost:5000/api/contact
📧 Testing email service configuration...
✅ Email service is ready!
📧 Admin email: arwamohamedsalah05@gmail.com
```

## 5. Test Email Functionality

Send a POST request to test email:
```bash
curl -X POST http://localhost:5000/api/contact/test-email
```

Or use a tool like Postman to test the endpoint.

## 6. How It Works

### When someone submits the contact form:

1. **Form Data Saved** → Contact information is saved to MongoDB
2. **Admin Notification** → You receive a beautiful HTML email with:
   - Contact person's details
   - Their message
   - Quick action buttons (Reply, Call)
3. **Auto-Reply** → The sender receives a professional auto-reply with:
   - Thank you message
   - Information about you
   - Your social media links
   - Expected response time

### Email Features:
- **Beautiful HTML templates** with your branding
- **Mobile-responsive** design
- **Professional styling** with gradients and modern layout
- **Quick action buttons** for easy response
- **Contact information** prominently displayed
- **Auto-replies** to improve user experience

## 7. Security Features

- **Rate limiting**: 3 contact submissions per 15 minutes per IP
- **Input validation**: All fields are validated and sanitized
- **Secure email**: Uses Gmail's secure SMTP with app passwords
- **Error handling**: Graceful failure - form still works even if email fails

## 8. Troubleshooting

### Email not sending?
1. Check that 2FA is enabled on your Google account
2. Verify you're using the App Password, not your regular password
3. Ensure EMAIL_USER and EMAIL_PASS are correctly set in .env
4. Check server logs for specific error messages

### Gmail blocking emails?
1. Make sure you're using App Passwords (not regular password)
2. Check Google Account security settings
3. Verify that "Less secure app access" is not needed (App Passwords are secure)

### Testing the setup:
1. Check server startup logs for email service status
2. Use the test endpoint: `POST /api/contact/test-email`
3. Try submitting the contact form from your frontend
4. Check your Gmail inbox for notifications

## 9. Production Deployment

For production:
1. Set `NODE_ENV=production` in your .env
2. Use a secure MongoDB connection string
3. Consider using a service like SendGrid or AWS SES for higher volume
4. Keep your App Password secure and regenerate if compromised

## Contact Form Flow

```
User fills form → Frontend sends to API → Data saved to MongoDB → 
Admin email sent → Auto-reply sent → Success response to user
```

Your Gmail will receive professional notifications for every contact form submission, and users will get a nice auto-reply confirming their message was received!