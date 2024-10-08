<div class="customer-form hide font-12" id="detail-customer">
    <div class="form-container">
        <h3 class="font-14 bold">Form Customer</h3>
        <div class="row">
            <div class="col-md-4 mb-3">
                <label for="nama_produk" class="form-label">Nama Lengkap</label>
                <input type="text" class="form-control customer" id="nama_lengkap" name="nama_lengkap"
                    required>
            </div>
        <div class="col-md-4 mb-3">
            <label for="ukuran_ayam" class="form-label">Email</label>
            <input type="email" class="form-control customer" id="email" name="email" required>
        </div>

        <div class="col-md-4 mb-3">
            <label for="bagian_ayam" class="form-label">Nomor Telepon</label>
            <input type="text" class="form-control customer" id="phone" name="phone" required>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 mb-3">
            <label for="harga" class="form-label">Alamat</label>
            <input type="text" class="form-control customer" id="alamat" name="alamat">
        </div>
        <div class="col-md-4 mb-3">
            <label for="stok" class="form-label">Postal Kode</label>
            <input type="number" class="form-control customer" id="postal_kode" name="postal_kode" required>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 mb-3">
            <label for="harga" class="form-label">Username</label>
            <input type="text" class="form-control customer" id="username" name="username">
        </div>
        <div class="col-md-4 mb-3">
            <label for="stok" class="form-label">Password</label>
            <input type="password" class="form-control customer" id="old" name="old" required disabled>
        </div>
        <div class="col-md-4 mb-3">
            <label for="stok" class="form-label">Password Baru</label>
            <input type="password" class="form-control customer" id="password" name="password" required>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <button class="btn btn-primary poppins" id="save-form" data-action="save-form">Simpan Produk</button>
            <button class="btn btn-danger poppins" id="cancel-form" data-action="cancel-form">Kembali</button>
        </div>
    </div>
</div>
</div>
