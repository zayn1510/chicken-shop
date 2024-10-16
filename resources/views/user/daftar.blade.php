<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Akun - PotongFresh</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Montserrat', sans-serif;
            background-color: #f0f2f5;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            padding: 0;
        }

        .register-container {
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
            padding: 40px;
            text-align: center;
        }

        h1 {
            font-size: 1.8em;
            margin-bottom: 10px;
            color: #333;
        }

        h2 {
            font-size: 1.5em;
            margin: 20px 0;
            color: #d32f2f;
        }

        .form-group {
            margin-bottom: 25px;
            text-align: left;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #555;
        }

        .form-group input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1em;
            box-sizing: border-box;
            transition: border-color 0.3s, box-shadow 0.3s;
            /* Menambahkan transisi untuk box-shadow */
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            /* Menambahkan shadow */
        }

        .form-group input:focus {
            border-color: #d32f2f;
            outline: none;
            box-shadow: 0 0 8px rgba(211, 47, 47, 0.5);
            /* Menambahkan shadow saat fokus */
        }

        .btn-submit {
            background-color: #d32f2f;
            color: white;
            padding: 12px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-align: center;
            transition: background-color 0.3s;
            width: 100%;
            font-size: 1.1em;
        }

        .btn-submit:hover {
            background-color: #c62828;
        }

        .back-link {
            margin-top: 20px;
        }

        .back-link a {
            color: #d32f2f;
            text-decoration: none;
            font-size: 1em;
        }

        .back-link a:hover {
            text-decoration: underline;
        }

        .icon {
            font-size: 60px;
            color: #d32f2f;
            margin-bottom: 20px;
        }

        .form-group {
            position: relative;
            margin-bottom: 20px;
        }

        .error-message {
            color: red;
            font-size: 11px;
            margin-top: 5px;
            display: none;
            /* Sembunyikan secara default */
        }

        input.invalid {
            border: 1px solid red;
        }
    </style>
</head>

<body ng-app="homeApp" ng-controller="homeController">

    <div class="register-container">
        <div class="icon">
            <i class="fas fa-user-plus"></i>
        </div>
        <h1>Masuk Akun</h1>
        <form id="registerForm">
            <div class="form-group">
                <label for="name">Nama Lengkap</label>
                <input type="text" id="nama_lengkap" name="nama_lengkap" class="daftar" required
                    placeholder="Masukkan nama lengkap">

            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" class="daftar" required
                    placeholder="Masukkan alamat email">
            </div>
            <div class="form-group">
                <label for="email">Nomor Handphone</label>
                <input type="number" id="phone" name="phone" class="daftar" required
                    placeholder="Masukkan Nomor Telepon">
            </div>

            <div class="form-group">
                <label for="email">Alamat</label>
                <input type="text" id="alamat" name="alamat" class="daftar" required
                    placeholder="Masukkan Alamat">
            </div>
            <div class="form-group">
                <label for="name">Nama Pengguna</label>
                <input type="text" id="username" name="username" class="daftar" required
                    placeholder="Masukkan Nama Pengguna">
            </div>
            <div class="form-group">
                <label for="password">Kata Sandi</label>
                <input type="password" id="password" name="password" class="daftar" required
                    placeholder="Masukkan kata sandi">
            </div>
            <button type="submit" class="btn-submit" id="btn-daftar">Daftar</button>
        </form>
        <div class="back-link">
            <a href="login">Sudah punya akun? Masuk di sini</a>
        </div>
    </div>
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
    <script type="module" src="{{ asset('dist/js/users/daftar.js') }}"></script>

</body>

</html>
