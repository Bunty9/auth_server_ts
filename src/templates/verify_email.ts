
export const verify_emailTemplate = (link: string): string => `
<!DOCTYPE html>
<html>
<head>
    <title>Verify Your Account</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #222;
            color: #999;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #2d2d2d;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #7a012b;
            color: #9f9f9f;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h2 {
            color: #7a012b;
            margin-top: 0;
        }
        .content p {
            line-height: 1.6;
            color: #555;
        }
        .btn {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #7a012b;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .btn:hover {
            background-color: #8a113b;
        }
        .footer {
            margin-top: 30px;
            padding: 15px;
            font-size: 12px;
            background-color: #111;
            color: #777;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Bunty9!</h1>
        </div>
        <div class="content">
            <h2>Verify Your Account</h2>
            <p>Hi there,</p>
            <p>Thank you for signing up on Bunty9. To complete your registration, please verify your email address by clicking the button below:</p>
            <a class="btn" href="${link}">Activate My Account</a>
            <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
            <p><a href="${link}">${link}</a></p>
            <p>We’re excited to have you onboard!</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Bunty9. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;