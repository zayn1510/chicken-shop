<div class="product-form hide font-12">
    <div class="form-container">
        <h3 class="font-14 bold">Produk</h3>
        <div class="row">
        <div class="col-md-4 mb-4">
            <label for="ukuran_ayam" class="form-label">Jenis Ayam</label>
            <select class="form-select form-control product" id="ukuran_ayam" name="ukuran_ayam" required>
            </select>
        </div>
        <div class="col-md-4 mb-4">
            <label for="berat" class="form-label">Berat</label>
            <input type="number" class="form-control product" id="berat" name="berat" value="0" disabled>
        </div>
        <div class="col-md-4 mb-4">
            <label for="harga" class="form-label">Harga</label>
            <input type="text" class="form-control product" id="harga" name="harga" value="0" disabled>
        </div>
    </div>
    <div class="mb-3">
        <label for="deskripsi" class="form-label">Keterangan Produk</label>
        <textarea class="form-control product" id="deskripsi" name="deskripsi" rows="3" required></textarea>
    </div>

    <div class="row">
        <div class="col-md-4 mb-3">
            <label for="umur_ayam" class="form-label">Umur Ayam</label>
            <input type="text" class="form-control product" id="umur_ayam" name="umur_ayam" value="0" disabled>
        </div>
         <div class="col-md-4 mb-3">
            <label for="tanggal_masuk" class="form-label">Tanggal Masuk</label>
            <input type="date" class="form-control product font-12" id="tanggal_masuk" name="tanggal_masuk">
        </div>
        <div class="col-md-4 mb-3">
            <label for="tanggal_produksi" class="form-label">Tanggal Produksi</label>
            <input type="date" class="form-control product font-12" id="tanggal_produksi" name="tanggal_produksi">
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
