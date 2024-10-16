<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detail Transaksi - PotongFresh</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Montserrat', sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            background-color: #f0f4f8;
        }

        header {
            background-color: #d32f2f;
            padding: 20px;
            color: white;
            text-align: center;
            border-bottom: 5px solid #b71c1c;
        }

        header h1 {
            margin: 0;
            font-size: 2em;
        }

        .transaction-section {
            padding: 40px 20px;
            max-width: 800px;
            margin: auto;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
        }

        .transaction-details {
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            border: 1px solid #e0e0e0;
            position: relative;
        }

        .transaction-details::before {
            content: '';
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 5px;
            background-color: #d32f2f;
            border-radius: 5px;
        }

        .transaction-details h2 {
            text-align: center;
            color: #d32f2f;
            margin-bottom: 20px;
            font-size: 1.8em;
        }

        .transaction-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #ccc;
            font-size: 1.1em;
        }

        .transaction-item:last-child {
            border-bottom: none;
        }

        .total {
            font-weight: bold;
            font-size: 1.4em;
            color: #d32f2f;
        }

        .payment-summary {
            background-color: #e3f2fd;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            margin-top: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .payment-summary h3 {
            color: #1976d2;
            margin-bottom: 10px;
            font-size: 1.5em;
        }

        .countdown {
            font-size: 1.5em;
            font-weight: bold;
            color: white;
            margin: 15px 0;
            background-color: #d32f2f;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            display: inline-block;
            animation: pulse 1.5s infinite;
        }

        .countdown span {
            display: inline-block;
            min-width: 50px;
            text-align: center;
            font-size: 1.8em;
            padding: 5px 10px;
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.2);
            margin: 0 5px;
            opacity: 1;
            transition: opacity 0.5s;
        }

        .btn-download {
            background-color: #1976d2;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-align: center;
            transition: background-color 0.3s, transform 0.3s;
            text-decoration: none;
            display: inline-block;
            margin-top: 15px;
            font-size: 1.1em;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .btn-download:hover {
            background-color: #0d47a1;
            transform: scale(1.05);
        }

        .back-link {
            text-align: center;
            margin-top: 20px;
        }

        .back-link a {
            color: #d32f2f;
            text-decoration: none;
            font-size: 1.1em;
        }

        .back-link a:hover {
            text-decoration: underline;
        }

        /* Animation Styles */
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }

        /* New styles for receipt header */
        .receipt-header {
            text-align: center;
            margin-bottom: 20px;
        }

        .receipt-header img {
            width: 100px;
            margin-bottom: 10px;
        }

        .receipt-header h2 {
            font-size: 1.5em;
            color: #d32f2f;
            margin: 5px 0;
        }

        .receipt-header p {
            margin: 0;
            font-size: 0.9em;
        }

        /* Styles for upload section */
        .upload-section {
            margin-top: 20px;
            text-align: center;
        }

        .upload-area {
            border: 2px dashed #1976d2;
            border-radius: 10px;
            padding: 20px;
            display: inline-block;
            cursor: pointer;
            transition: background-color 0.3s, border-color 0.3s;
            position: relative;
            overflow: hidden;
        }

        .upload-area:hover {
            background-color: #e3f2fd;
            border-color: #0d47a1;
        }

        .upload-area img {
            max-width: 100%;
            max-height: 100%;
            display: none;
            border-radius: 10px;
            margin-top: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .upload-area span {
            display: block;
            text-align: center;
            color: #1976d2;
            font-weight: bold;
            margin-top: 10px;
        }

        /* Hide default input file */
        input[type="file"] {
            display: none;
        }
    </style>
</head>

<body>

<header>
    <h1>Detail Transaksi</h1>
</header>

<section class="transaction-section">
    <div class="transaction-details">
        <div class="receipt-header">
            <img src="https://via.placeholder.com/100" alt="Logo PotongFresh">
            <h2>PT. PotongFresh</h2>
            <p>Jalan Ayam Segar No. 123</p>
            <p>Telp: 0812-3456-7890</p>
        </div>
        <h2>Ringkasan Pesanan</h2>
        <div class="transaction-item">
            <span>Ayam Potong Utuh</span>
            <span>Rp 45.000 x 1</span>
        </div>
        <div class="transaction-item">
            <span>Ayam Potong Fillet</span>
            <span>Rp 50.000 x 1</span>
        </div>
        <div class="transaction-item total">
            <span>Total:</span>
            <span>Rp 95.000</span>
        </div>
    </div>

    <div class="payment-summary">
        <h3>Metode Pembayaran</h3>
        <p>Transfer Bank</p>
        <p>Bank: BCA</p>
        <p>No. Rekening: 1234567890</p>
        <p>Nama: PT. PotongFresh</p>
        
        <!-- Countdown Payment -->
        <div class="countdown" id="countdown">
            <span id="minutes"></span>m
            <span id="seconds"></span>s
        </div>
    </div>

    <div class="upload-section">
        <h3>Unggah Bukti Pembayaran</h3>
        <label class="upload-area">
            <input type="file" accept="image/*" onchange="previewImage(event)">
            <span>Seret dan lepas gambar di sini atau klik untuk memilih file</span>
            <img id="uploaded-image" src="" alt="Uploaded Payment Proof">
        </label>
    </div>

    <div class="back-link">
        <a href="index.html">Kembali ke Beranda</a>
    </div>
</section>

<script>
    // Countdown Timer
    const countdown = document.getElementById('countdown');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');

    let totalSeconds = 600; // 10 minutes in seconds
    const updateCountdown = () => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        minutesSpan.innerText = String(minutes).padStart(2, '0');
        secondsSpan.innerText = String(seconds).padStart(2, '0');

        if (totalSeconds > 0) {
            totalSeconds--;
        }
    };
    setInterval(updateCountdown, 1000);

    // Image Preview Function
    function previewImage(event) {
        const file = event.target.files[0];
        const imgElement = document.getElementById('uploaded-image');

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imgElement.src = e.target.result;
                imgElement.style.display = 'block';
            }
            reader.readAsDataURL(file);
        } else {
            imgElement.src = '';
            imgElement.style.display = 'none';
        }
    }
</script>
</body>

</html>
