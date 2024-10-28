<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Registration Successful</title>
    <link rel="stylesheet" href="styles.css">
</head>
<style>
    /* Reset some basic styles */
    body,
    html {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Arial', sans-serif;
    }

    /* Center the content */
    .success-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #f3f3f3;
    }

    /* Card styling */
    .success-card {
        background-color: #ffffff;
        border-radius: 15px;
        padding: 30px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        text-align: center;
        width: 300px;
    }

    /* Checkmark SVG animation */
    .checkmark {
        width: 80px;
        height: 80px;
        display: block;
        margin: 0 auto 20px;
    }

    .checkmark-circle {
        stroke: #4caf50;
        stroke-width: 3;
        animation: draw-circle 1s ease-out forwards;
    }

    .checkmark-check {
        stroke: #4caf50;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
        animation: draw-check 1s 0.5s ease-out forwards;
    }

    @keyframes draw-circle {
        from {
            stroke-dasharray: 0 157;
        }

        to {
            stroke-dasharray: 157 157;
        }
    }

    @keyframes draw-check {
        from {
            stroke-dasharray: 0 36;
        }

        to {
            stroke-dasharray: 36 36;
        }
    }

    /* Typography */
    h1 {
        font-size: 24px;
        color: #333;
    }

    p {
        font-size: 16px;
        color: #666;
    }

    /* Button styling */
    .btn {
        background-color: #4caf50;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;
    }

    .btn:hover {
        background-color: #43a047;
    }
</style>

<body>
    <div class="success-container">
        <div class="success-card">
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
            <h1>Registrasi Suksess!</h1>
            <p>Akun berhasil di buat</p>
            <button class="btn" onclick="window.location.href='login-user'">Go to Login</button>
        </div>
    </div>
</body>

</html>
