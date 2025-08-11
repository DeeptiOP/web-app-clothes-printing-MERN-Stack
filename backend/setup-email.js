import readline from 'readline';
import fs from 'fs';
import path from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Email Configuration Setup for PrinTeeQ');
console.log('==========================================\n');

console.log('This script will help you configure email settings for password reset functionality.');
console.log('You can use Gmail, Outlook, Yahoo, or any custom SMTP provider.\n');

console.log('📧 For Gmail:');
console.log('1. Enable 2-Factor Authentication on your Google account');
console.log('2. Generate an App Password: https://support.google.com/accounts/answer/185833');
console.log('3. Use your Gmail address and the App Password (not your regular password)\n');

console.log('📧 For Outlook:');
console.log('1. Use your Outlook email and password');
console.log('2. Host: smtp-mail.outlook.com, Port: 587\n');

const questions = [
  'Enter your email provider (gmail/outlook/yahoo/custom): ',
  'Enter your email address: ',
  'Enter your email password (App Password for Gmail): '
];

let answers = [];
let currentQuestionIndex = 0;

function askQuestion() {
  if (currentQuestionIndex < questions.length) {
    rl.question(questions[currentQuestionIndex], (answer) => {
      answers.push(answer.trim());
      currentQuestionIndex++;
      askQuestion();
    });
  } else {
    setupEmailConfig();
  }
}

function setupEmailConfig() {
  const [provider, email, password] = answers;
  
  let host, port;
  
  switch (provider.toLowerCase()) {
    case 'gmail':
      host = 'smtp.gmail.com';
      port = 587;
      break;
    case 'outlook':
      host = 'smtp-mail.outlook.com';
      port = 587;
      break;
    case 'yahoo':
      host = 'smtp.mail.yahoo.com';
      port = 587;
      break;
    case 'custom':
      rl.question('Enter SMTP host: ', (customHost) => {
        rl.question('Enter SMTP port (usually 587): ', (customPort) => {
          host = customHost.trim();
          port = customPort.trim() || 587;
          updateEnvFile(host, port, email, password);
        });
      });
      return;
    default:
      console.log('❌ Invalid provider. Using Gmail settings by default.');
      host = 'smtp.gmail.com';
      port = 587;
  }
  
  updateEnvFile(host, port, email, password);
}

function updateEnvFile(host, port, email, password) {
  const envPath = path.join(process.cwd(), '.env');
  
  try {
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Update email configuration
    envContent = envContent.replace(/EMAIL_HOST=.*/, `EMAIL_HOST=${host}`);
    envContent = envContent.replace(/EMAIL_PORT=.*/, `EMAIL_PORT=${port}`);
    envContent = envContent.replace(/EMAIL_USER=.*/, `EMAIL_USER=${email}`);
    envContent = envContent.replace(/EMAIL_PASS=.*/, `EMAIL_PASS=${password}`);
    
    fs.writeFileSync(envPath, envContent);
    
    console.log('\n✅ Email configuration updated successfully!');
    console.log(`📧 Provider: ${host}`);
    console.log(`📧 Email: ${email}`);
    console.log(`📧 Port: ${port}`);
    console.log('\n🔄 Please restart your server to apply the changes.');
    console.log('💡 You can now test the password reset functionality!');
    
  } catch (error) {
    console.error('❌ Error updating .env file:', error.message);
    console.log('\n📝 Please manually update your .env file with these values:');
    console.log(`EMAIL_HOST=${host}`);
    console.log(`EMAIL_PORT=${port}`);
    console.log(`EMAIL_USER=${email}`);
    console.log(`EMAIL_PASS=${password}`);
  }
  
  rl.close();
}

// Start the configuration process
askQuestion();
