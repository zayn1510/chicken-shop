<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PotongFresh - Pesan Sekarang</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Montserrat', sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            background-color: #f8f8f8;
        }

        header {
            background-color: #6256CA;
            padding: 20px;
            color: white;
            text-align: center;
        }

        header h1 {
            margin: 0;
        }

        .order-section {
            padding: 40px 20px;
            max-width: 1200px;
            margin: auto;
        }

        .order-form h2 {
            text-align: center;
            color: #d32f2f;
            margin-bottom: 30px;
        }

        .product-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
        }

        .product-card {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            width: 300px;
            text-align: center;
            padding: 20px;
            transition: transform 0.3s;
        }

        .product-card img {
            width: 200px;
            height: 200px;
            object-fit: cover;
    
            border-radius: 10px;
            margin-bottom: 10px;
        }

        .product-card h3 {
            margin: 15px 0;
            color: #d32f2f;
        }

        .product-card p {
            color: #666;
            font-size: 0.9em;
        }

        .product-actions {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
        }

        .product-actions button {
            background-color: #d32f2f;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            font-size: 1em;
            cursor: pointer;
            width: 40px;
            height: 40px;
            transition: background-color 0.3s;
        }

        .product-actions button:hover {
            background-color: #b71c1c;
        }

        .product-actions input {
            text-align: center;
            width: 50px;
            padding: 10px;
            font-size: 1em;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .payment-methods {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            margin-top: 40px;
            text-align: center;
        }

        .payment-methods h3 {
            color: #d32f2f;
            margin-bottom: 20px;
        }

        .btn-order {
            background-color: #d32f2f;
            color: white;
            padding: 15px;
            text-align: center;
            display: block;
            width: 200px;
            border: none;
            border-radius: 5px;
            font-size: 1.2em;
            cursor: pointer;
            transition: background-color 0.3s;
            margin: 30px auto;
        }

        .btn-order:hover {
            background-color: #b71c1c;
        }

        .back-link {
            text-align: center;
            margin-top: 20px;
        }

        .back-link a {
            color: #d32f2f;
            text-decoration: none;
        }

        .back-link a:hover {
            text-decoration: underline;
        }

        /* Style untuk dropdown */
        select {
            width: 200px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1em;
            background-color: white;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="gray"><path d="M5 8l5 5 5-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
            background-repeat: no-repeat;
            background-position: right 10px center;
            background-size: 15px;
            cursor: pointer;
            transition: border 0.3s;
        }

        select:focus {
            outline: none;
            border-color: #d32f2f;
            box-shadow: 0 0 5px rgba(211, 47, 47, 0.5);
        }

        /* Style untuk dropdown bank */
        .bank-dropdown {
            /* Sembunyikan dropdown secara default */
            margin-top: 20px;
            text-align: center;
        }
        .hide{
            display:none;
        }
    </style>
</head>

<body ng-app="homeApp" class="hold-transition sidebar-mini" ng-controller="homeController">

    <header>
        <h1>Pesan Ayam Potong Segar</h1>
    </header>

    <section class="order-section">
        <h2>Pesan Produk</h2>
        <div class="product-list">
         
        </div>

        <div class="payment-methods">
            <h3>Pilih Metode Pembayaran</h3>
            <select id="paymentMethod">
                <option value="0">-- Pilih Metode Pembayaran --</option>

            </select>

            <div class="bank-dropdown hide" id="bankDropdown">
                <label for="bankList">Pilih Bank:</label>
                <select id="bankList">
                   
                </select>
            </div>
        </div>

        <button class="btn-order" id="pesan-sekarang">Pesan Sekarang</button>

        <div class="back-link">
            <a href="{{url("/")}}">Kembali ke Beranda</a>
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
        <script type="module" src="{{ asset('dist/js/users/pesan.js') }}"></script>

</body>

</html>
