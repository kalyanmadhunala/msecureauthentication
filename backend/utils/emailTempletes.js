export const verifyOTPTemplete = (username, otp) => {
    return `
      <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>OTP Verification</title>

<style>
  body {
    margin: 0;
    padding: 0;
    background: #f4f7fb;
    font-family: Arial, sans-serif;
  }

  .wrapper {
    width: 100%;
    padding: 20px 0;
  }

  .container {
    max-width: 500px;
    margin: auto;
    background: #ffffff;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0,0,0,0.08);
  }

  .header {
    background: linear-gradient(135deg, #a29bfe, #8c52ff);
    padding: 25px;
    text-align: center;
    color: #fff;
  }

  .logo {
    width: 50px;
    margin-bottom: 10px;
  }

  .brand-name {
    font-size: 20px;
    font-weight: bold;
  }

  .content {
    padding: 30px;
    text-align: center;
    color: #333;
  }

  .username {
    font-weight: bold;
    color: #8c52ff;
  }

  .otp {
    font-size: 28px;
    letter-spacing: 6px;
    font-weight: bold;
    background: #eef2ff;
    padding: 15px;
    border-radius: 10px;
    display: inline-block;
    margin: 20px 0;
  }

  .footer {
    text-align: center;
    font-size: 12px;
    padding: 20px;
    color: #888;
  }

  /* 🌙 Dark Mode */
  @media (prefers-color-scheme: dark) {
    body {
      background: #0f172a;
    }

    .container {
      background: #1e293b;
      color: #e2e8f0;
    }

    .content {
      color: #e2e8f0;
    }

    .otp {
      background: #334155;
      color: #fff;
    }

    .footer {
      color: #94a3b8;
    }
  }

  @media (max-width: 600px) {
    .content {
      padding: 20px;
    }
  }
</style>
</head>

<body>
  <div class="wrapper">
    <div class="container">

      <div class="header">
        <img src="https://res.cloudinary.com/dbanrkx7w/image/upload/v1775390099/mSecureAuth_logo_wbg_im5ij8.png" class="logo" alt="Logo">
        <div class="brand-name">mSecure Auth</div>
      </div>

      <div class="content">
        <p>Hello <span class="username">${username}</span>,</p>

        <p>Your OTP code is:</p>

        <div class="otp">${otp}</div>

        <p>This code expires in 5 minutes.</p>
      </div>

      <div class="footer">
        © 2026 mSecure Auth. All rights reserved.
      </div>

    </div>
  </div>
</body>
</html>
      `
}

export const verifyResetOTPTemplete = (username, resetotp) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Password Reset</title>

<style>
  body {
    margin: 0;
    padding: 0;
    background: #f4f7fb;
    font-family: Arial, sans-serif;
  }

  .wrapper {
    width: 100%;
    padding: 20px 0;
  }

  .container {
    max-width: 500px;
    margin: auto;
    background: #ffffff;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0,0,0,0.08);
  }

  .header {
    background: linear-gradient(135deg, #a29bfe, #8c52ff);
    padding: 25px;
    text-align: center;
    color: #fff;
  }

  .logo {
    width: 50px;
    margin-bottom: 10px;
  }

  .otp {
    font-size: 28px;
    letter-spacing: 6px;
    font-weight: bold;
    background: #eef2ff;
    padding: 15px;
    border-radius: 10px;
    display: inline-block;
    margin: 20px 0;
  }

  .brand-name {
    font-size: 20px;
    font-weight: bold;
  }

  .content {
    padding: 30px;
    text-align: center;
    color: #333;
  }

  .username {
    font-weight: bold;
    color: #6366f1;
  }


  .note {
    margin-top: 20px;
    font-size: 13px;
    color: #777;
  }

  .footer {
    text-align: center;
    font-size: 12px;
    padding: 20px;
    color: #888;
  }

  /* 🌙 Dark Mode */
  @media (prefers-color-scheme: dark) {
    body {
      background: #0f172a;
    }

    .container {
      background: #1e293b;
      color: #e2e8f0;
    }

    .content {
      color: #e2e8f0;
    }

    .otp {
      background: #334155;
      color: #fff;
    }

    .footer {
      color: #94a3b8;
    }
  }

  @media (max-width: 600px) {
    .content {
      padding: 20px;
    }
  }
</style>
</head>

<body>
  <div class="wrapper">
    <div class="container">

      <div class="header">
        <img src="https://res.cloudinary.com/dbanrkx7w/image/upload/v1775390099/mSecureAuth_logo_wbg_im5ij8.png" class="logo" alt="Logo">
        <div class="brand-name">mSecure Auth</div>
      </div>

      <div class="content">
        <p>Hello <span class="username">${username}</span>,</p>

        <p>We received a request to reset your password.</p>

        <p>Your reset password OTP code is:</p>

        <div class="otp">${resetotp}</div>

        <p class="note">
          This otp will expire in 5 minutes.
        </p>
      </div>

      <div class="footer">
        © 2026 mSecure Auth. All rights reserved.
      </div>

    </div>
  </div>
</body>
</html>
    `
}

export const welcomeEmailTemplete = (name, email) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome Email</title>

<style>
  body {
    margin: 0;
    padding: 0;
    background: #f4f7fb;
    font-family: Arial, sans-serif;
  }

  .wrapper {
    width: 100%;
    padding: 20px 0;
  }

  .container {
    max-width: 500px;
    margin: auto;
    background: #ffffff;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0,0,0,0.08);
  }

  .header {
    background: linear-gradient(135deg, #a29bfe, #8c52ff);
    padding: 30px;
    text-align: center;
    color: #fff;
  }

  .brand {
    font-size: 22px;
    font-weight: bold;
  }

  .content {
    padding: 30px;
    text-align: center;
    color: #333;
  }

  .username {
    font-weight: bold;
    color: #8c52ff;
  }

  .info-box {
    background: #f3f0ff;
    border-radius: 10px;
    padding: 15px;
    margin: 20px 0;
    font-size: 14px;
    text-align: left;
  }

  .btn {
    display: inline-block;
    margin-top: 20px;
    padding: 12px 25px;
    background: linear-gradient(135deg, #8c52ff, #a29bfe);
    color: #fff;
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
  }

  .footer {
    text-align: center;
    font-size: 12px;
    padding: 20px;
    color: #888;
  }

  /* 🌙 Dark Mode */
  @media (prefers-color-scheme: dark) {
    body {
      background: #0f172a;
    }

    .container {
      background: #1e293b;
      color: #e2e8f0;
    }

    .content {
      color: #e2e8f0;
    }

    .info-box {
      background: #334155;
      color: #fff;
    }

    .footer {
      color: #94a3b8;
    }
  }

  @media (max-width: 600px) {
    .content {
      padding: 20px;
    }
  }
</style>
</head>

<body>
  <div class="wrapper">
    <div class="container">

      <div class="header">
        <div class="brand">mSecure Auth</div>
      </div>

      <div class="content">
        <h2>Welcome on board 🎉</h2>

        <p>Hello <span class="username">${name}</span>,</p>

        <p>We're excited to have you with us! Your account has been successfully created.</p>

        <div class="info-box">
          <p><strong>Email:</strong> ${email}</p>
        </div>

        <p>You can now explore all features and enjoy a secure experience with us.</p>
      </div>

      <div class="footer">
        © 2026 mSecure Auth. All rights reserved.
      </div>

    </div>
  </div>
</body>
</html>`
}