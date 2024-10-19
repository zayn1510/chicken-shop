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

        .upload-section {
            display: flex;
            flex-direction: column;
            align-items: center;
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

        .font-13 {
            font-size: 13px;
        }

        /* Styles for Upload Payment Button */
        .upload-section .btn {
            background: linear-gradient(135deg, #1976d2, #0d47a1);
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-align: center;
            transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
            text-decoration: none;
            display: inline-block;
            margin-top: 15px;
            font-size: 1.1em;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }

        .upload-section .btn:hover {
            background: linear-gradient(135deg, #0d47a1, #1976d2);
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
        }

        .upload-section .btn:active {
            transform: translateY(1px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .hide {
            display: none;
        }

        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4f4f4;
        }

        .transaction-flow {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }

        .step {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #ccc;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
            font-weight: bold;
            font-size: 16px;
        }

        .completed .circle {
            background-color: #4caf50;
            /* Green for completed */
        }

        .in-progress .circle {
            background-color: #ff9800;
            /* Orange for in-progress */
        }

        .connector {
            width: 60px;
            height: 3px;
            background-color: #ccc;
            margin: 0 10px;
        }

        .completed+.connector {
            background-color: #4caf50;
            /* Connector green when completed */
        }

        .in-progress+.connector {
            background-color: #ff9800;
            /* Connector orange when in-progress */
        }

        p {
            margin: 0;
            font-size: 14px;
            color: #333;
        }

        .status_pembayaran {
            background: linear-gradient(135deg, #4caf50, #81c784);
            color: #fff;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            width: fit-content;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            margin: 20px auto;
            position: relative;
            overflow: hidden;
        }

        .status_pembayaran p {
            margin: 0;
        }

        .status_pembayaran::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: rgba(255, 255, 255, 0.15);
            transform: rotate(45deg);
            transition: all 0.4s ease;
        }

        .status_pembayaran:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }

        .status_pembayaran:hover::before {
            top: -40%;
            left: -40%;
            width: 180%;
            height: 180%;
        }
    </style>
</head>

<body ng-app="homeApp" class="hold-transition sidebar-mini" ng-controller="homeController">

    <input type="hidden" id="nomor_order" name="nomor_order"/ value="{{ $data['nomor'] }}">
    <input type="hidden" id="digit" name="digit"/ value="{{ $data['digit'] }}">

    <section class="transaction-section">
        <div class="transaction-details">
            <div class="transaction-flow">
                <div class="step completed">
                    <div class="circle">1</div>
                    <p>Order Placed</p>
                </div>
                <div class="connector"></div>
                <div class="step">
                    <div class="circle">2</div>
                    <p>Payment Confirmed</p>
                </div>
                <div class="connector"></div>
                <div class="step">
                    <div class="circle">3</div>
                    <p>Shipped</p>
                </div>
                <div class="connector"></div>
                <div class="step">
                    <div class="circle">4</div>
                    <p>Delivered</p>
                </div>
            </div>
            <div class="receipt-header">

                <h2>PT. PotongFresh</h2>
                <p>Jalan Ayam Segar No. 123</p>
                <p>Telp: 0812-3456-7890</p>
            </div>
            <h2>Ringkasan Pesanan</h2>
            <div class="transaction-item">
                <span>Nomor Transaksi</span>
                <span id="nomor_transaksi"></span>
            </div>
            <div class="transaction-item">
                <span>Status</span>
                <span id="status"></span>
            </div>
            <div class="transaction-item">
                <span>Tanggal</span>
                <span id="tanggal"></span>
            </div>
            <div class="transaction-list font-13">
            </div>
            <div class="transaction-item">
                <span>Total</span>
                <span id="total"></span>
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
                <span id="hours"></span>Jam
                <span id="minutes"></span>Menit
            </div>
        </div>

        <div class="status_pembayaran">
        </div>
        <div class="upload-section">
            <h3>Unggah Bukti Pembayaran</h3>
            <label class="upload-area">
                <input type="file" accept="image/*" data-action="preview-image" id="file-image">
                <span>Seret dan lepas gambar di sini atau klik untuk memilih file</span>
                <img id="uploaded-image" src="" alt="Uploaded Payment Proof">
            </label>
            <button class="btn btn-primary" data-action="upload-foto-pembayaran">Upload Foto Pembayaran</button>
        </div>

        <div class="back-link">
            <a href="index.html">Kembali ke Beranda</a>
        </div>
    </section>
    <script>
        var API = "{{ env('API_URL') }}";
        var API_SERVICE = "{{ env('API_SERVICE') }}";

        var accessToken = "{{ session('token') }} ";
    </script>
    <script src="{{ asset('plugins/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('dist/js/angular.min.js') }}"></script>
    <script src="{{ asset('dist/js/angular-route.min.js') }}"></script>
    <script src="{{ asset('dist/js/sweetalert.min.js') }}"></script>
    <script src="{{ asset('dist/js/angular-datatables.min.js') }}"></script>
    <script type="module" src="{{ asset('dist/js/users/transaksi.js') }}"></script>
    <script></script>
</body>

</html>
