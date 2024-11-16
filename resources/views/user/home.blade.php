<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PotongFresh - Ayam Potong Segar</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
    <link href="{{ asset('dist/css/user.css') }}" rel="stylesheet" />
    <link rel="icon" href="{{ $data["website"]->urllogo }}" type="image/png">
    <style>

    </style>
</head>

<body ng-app="homeApp" class="hold-transition sidebar-mini" ng-controller="homeController">
    <nav>
        <div class="logo">{{ $data["website"]->name }}</div>
        <div class="order-check">
            <input type="text" placeholder="Cek Nomor Order" id="nomor_order" data-action="search-order">
            <button>Cek</button>
        </div>
        <div class="menu-toggle" id="mobile-menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
        <ul class="nav-list">
            <li><a href="#">Beranda</a></li>
            <li><a href="#promo">Promo</a></li>
            <li><a href="#features">Kenapa Kami?</a></li>
            <li><a href="#testimonials">Testimoni</a></li>
            <li><a href="#">Kontak</a></li>
        </ul>
    </nav>
    
    <header class="hero">
       <div class="container-chicken-shop">
        <div class="hero-content">
            <h1>Ayam Potong Fresh<br>Masak Jadi Lebih Mudah!</h1>
            <p>Ayam Potong Segar Langsung dari Peternakan ke Pintu Anda</p>
            <a href="pesan" class="btn-primary">Pesan Sekarang</a>
        </div>
        <img src="{{ $data["website"]->urlimage }}" alt="Fresh Chicken" class="hero-image">
       </div>
    </header>


    <section id="promo">
        <h2>Promo Spesial Minggu Ini!</h2>
        
        <p>Dapatkan potongan harga 20% untuk setiap pembelian 2 ekor ayam potong. Stok terbatas, jadi pesan sekarang!
        </p>

        <div class="promo-details">
            <h3>Produk Kami</h3>
            <div class="cont">
                 
            </div>
            
        </div>

    </section>

    <section id="features">
        <h2>Kenapa Memilih Kami?</h2>
        <p>Kami di PotongFresh berkomitmen untuk memberikan ayam potong berkualitas tinggi dan pelayanan terbaik kepada
            pelanggan kami. Berikut adalah alasan mengapa Anda harus memilih kami:</p>

        <div class="features">
            <div class="feature">
                <img src="{{asset("assets/support.png")}}" alt="Kualitas">
                <h4>Kualitas Terbaik</h4>
                <p>Ayam kami berasal dari peternakan yang terjamin kualitas dan kesehatannya.</p>
            </div>
            <div class="feature">
                <img src="https://img.icons8.com/ios-filled/50/000000/delivery.png" alt="Pengiriman">
                <h4>Pengiriman Cepat</h4>
                <p>Pesanan Anda akan dikirimkan dalam waktu yang cepat dan aman.</p>
            </div>
            <div class="feature">
                <img src="https://img.icons8.com/ios-filled/50/000000/support.png" alt="Dukungan">
                <h4>Dukungan Pelanggan</h4>
                <p>Kami siap membantu Anda kapan saja. Tim dukungan pelanggan kami siap menjawab pertanyaan dan
                    memberikan bantuan.</p>
            </div>
        </div>
    </section>

    <section class="testimonials" id="testimonials">
        <h2>Apa Kata Pelanggan Kami?</h2>
        <div class="testimonial">"Ayamnya sangat segar dan enak! Pengiriman juga cepat!" - <strong>Rina</strong></div>
        <div class="testimonial">"Pelayanan terbaik! Saya pasti akan memesan lagi!" - <strong>Joko</strong></div>
        <div class="testimonial">"Harga sangat bersahabat dengan kualitas yang didapat!" - <strong>Sarah</strong></div>
    </section>

    <footer>
        <p>&copy; 2024 PotongFresh. Semua hak dilindungi.</p>
        <p>Ikuti kami di <a href="#" style="color: white;">Facebook</a>, <a href="#"
                style="color: white;">Instagram</a>, dan <a href="#" style="color: white;">Twitter</a>.</p>
    </footer>
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
    <script type="module" src="{{ asset('dist/js/users/app.js') }}"></script>
</body>

</html>
