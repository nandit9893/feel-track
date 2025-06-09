const user_verification_template = (fullName, verificationCode) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>OTP Verification</title>
</head>
<body style="margin:0; padding:0; background:#f4f7fc; font-family: Arial, sans-serif; color:#333;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
    style="max-width:480px; margin:20px auto; background:#fff; border-radius:8px; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
    <tr>
      <td align="center" style="padding:20px;">
        <img src="https://res.cloudinary.com/dqzskp5s3/image/upload/v1749459597/feel-track_jltena.png"
          alt="OpenTalk Logo" width="200" style="display:block; border-radius: 10px;" />
      </td>
    </tr>
    <tr>
      <td style="padding:0 20px 10px; text-align:center; font-weight:bold; font-size:22px; color:#0b0e16;">
        OTP Verification
      </td>
    </tr>
    <tr>
      <td style="padding:0 20px 10px; text-align:center; font-size:16px;">
        Hello <strong style="color:#0078d7;">${fullName}</strong>,
      </td>
    </tr>
    <tr>
      <td style="padding:0 20px 25px; text-align:center; font-size:14px; color:#555;">
        Your One-Time Password (OTP) for email verification is:
      </td>
    </tr>
    <tr>
      <td align="center" style="padding:0 20px 30px;">
        <span
          style="background:#0078d7; color:#fff; font-family: monospace, monospace; font-size:28px; font-weight:bold; letter-spacing:8px; padding:10px 20px; border-radius:6px; display:inline-block;">
          ${verificationCode}
        </span>
      </td>
    </tr>
    <tr>
      <td style="padding:0 20px 10px; text-align:center; font-size:12px; color:#777; line-height:1.4;">
        This OTP is valid for the next 10 minutes.<br />
        Please do not share it with anyone.
      </td>
    </tr>
    <tr>
      <td style="padding:20px 20px 40px; text-align:center; font-size:12px; color:#777;">
        If you did not request this, please ignore this email.
      </td>
    </tr>
    <tr>
      <td style="text-align:center; font-size:10px; color:#aaa; padding-bottom:10px; user-select:none;">
        &copy; 2025 FeelTrack. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export default user_verification_template;
