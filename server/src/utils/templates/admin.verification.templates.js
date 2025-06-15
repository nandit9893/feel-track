const admin_verification_template = (fullName, verificationCode, role) => {
  return `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>OpenTalk OTP Verification</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      background-color: #f5f7fa;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #222222;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      height: 100%;
    }
    .container {
      max-width: 480px;
      background-color: #ffffff;
      margin: 30px auto;    
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      padding: 20px 30px;  
      box-sizing: border-box;
    }
    .logo {
      display: block;
      margin: 0 auto 15px auto;
      height: 80px;
      object-fit: contain;
    }
    h2 {
      color: #101928;
      font-weight: 700;
      text-align: center;
      margin-bottom: 10px;    
      font-size: 24px;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
      text-align: center;
      margin: 8px 0;            
      color: #444444;
    }
    .otp-box {
      display: block;          
      width: fit-content;
      margin: 25px auto;      
      font-size: 36px;
      font-weight: 700;
      letter-spacing: 8px;
      background: linear-gradient(90deg, #0047ab 0%, #00aaff 100%);
      color: white;
      padding: 16px 40px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 119, 204, 0.4);
      user-select: all;
      text-align: center;
    }
    .footer-text {
      font-size: 13px;
      color: #888888;
      margin-top: 20px;        
      text-align: center;
      line-height: 1.4;
    }
    .footer-copy {
      margin-top: 30px;         
      font-size: 12px;
      color: #bbbbbb;
      text-align: center;
      user-select: none;
    }
    strong.name {
      font-size: 18px;
      color: #0074d9;
    }
    @media only screen and (max-width: 520px) {
      .container {
        margin: 20px;
        padding: 15px 20px;
      }
      .otp-box {
        font-size: 28px;
        padding: 14px 30px;
        letter-spacing: 6px;
      }
    }
  </style>
</head>
<body>
  <div class="container" role="main">
    <img
      src="https://res.cloudinary.com/dqzskp5s3/image/upload/v1749459597/feel-track_jltena.png"
      alt="OpenTalk Logo"
      class="logo"
    />

    <h2>OTP Verification</h2>

    <p>Hello <strong class="name">${fullName} (${role})</strong>,</p>
    <p>Your One Time Password (OTP) for email verification is:</p>

    <div class="otp-box" aria-label="OTP code">${verificationCode}</div>

    <p class="footer-text">
      This OTP is valid for the next <strong>5 minutes</strong>.<br />
      Please do not share it with anyone.
    </p>

    <p class="footer-text">
      If you did not request this, please ignore this email.
    </p>

    <p class="footer-copy">&copy; 2025 OpenTalk. All rights reserved.</p>
  </div>
</body>
</html>
`;
};

export default admin_verification_template;
