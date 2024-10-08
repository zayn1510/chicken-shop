<div class="product-form hide font-12">
    <div class="form-container">
        <h3 class="font-14 bold">Produk</h3>
        <div class="row">
            <div class="col-md-4 mb-3">
                <label for="nama_produk" class="form-label">Nama Produk</label>
                <input type="text" class="form-control product" id="nama_produk" name="produk_name"
                    required>
            </div>
        <div class="col-md-4 mb-3">
            <label for="ukuran_ayam" class="form-label">Ukuran Ayam</label>
            <select class="form-select form-control product" id="ukuran_ayam" name="ukuran_ayam" required>
                <option value="">Pilih Ukuran Ayam</option>
                <option value="kecil">Kecil</option>
                <option value="sedang">Sedang</option>
                <option value="besar">Besar</option>
            </select>
        </div>

        <div class="col-md-4 mb-3">
            <label for="bagian_ayam" class="form-label">Bagian Ayam</label>
            <select class="form-select form-control product" id="bagian_ayam" name="bagian_ayam" required>
                <option value="">Pilih Bagian Ayam</option>
                <option value="utuh">Utuh</option>
                <option value="dada">Dada</option>
                <option value="paha">Paha</option>
                <option value="sayap">Sayap</option>
            </select>
        </div>
    </div>
    <div class="mb-3">
        <label for="deskripsi" class="form-label">Deskripsi Produk</label>
        <textarea class="form-control product" id="deskripsi" name="deskripsi" rows="3" required></textarea>
    </div>

    <div class="row">
        <div class="col-md-4 mb-3">
            <label for="harga" class="form-label">Harga</label>
            <input type="text" class="form-control product" id="harga" name="harga" value="0"
                data-action="price-action" required>
        </div>
        <div class="col-md-4 mb-3">
            <label for="stok" class="form-label">Stok</label>
            <input type="number" class="form-control product" id="stok" name="stok" value="0" required>
        </div>
        <div class="col-md-4 mb-3">
            <label for="diskon" class="form-label">Diskon</label>
            <input type="number" class="form-control product" id="diskon" name="diskon" value="0" required>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6 mb-3">
            <label for="berat_rata_rata" class="form-label">Berat Rata-rata</label>
            <input type="number" class="form-control product" id="berat_rata_rata" name="berat_rata_rata" value="0" required> 
        </div>
        <div class="col-md-6 mb-3">
            <label for="umur_ayam" class="form-label">Umur Ayam</label>
            <input type="text" class="form-control product" id="umur_ayam" name="umur_ayam" value="0" required>
        </div>
    </div>
    <div class="row">
         <div class="col-md-4 mb-3">
            <label for="tanggal_masuk" class="form-label">Tanggal Masuk</label>
            <input type="date" class="form-control product font-12" id="tanggal_masuk" name="tanggal_masuk">
        </div>
        <div class="col-md-4 mb-3">
            <label for="tanggal_produksi" class="form-label">Tanggal Produksi</label>
            <input type="date" class="form-control product font-12" id="tanggal_produksi" name="tanggal_produksi">
        </div>
        <div class="col-md-4 mb-3">
            <label for="tanggal_kadaluarsa" class="form-label">Tanggal Kalauarsa</label>
            <input type="date" class="form-control product font-12" id="tanggal_kadaluarsa" name="tanggal_kadaluarsa">
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
