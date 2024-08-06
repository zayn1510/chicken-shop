<div class="suplier-form hide font-12">
    <h4 class="mb-4">Data Supplier</h4>
    <div class="row">
        <div class="col-md-6 mb-3">
            <label for="name" class="form-label">Nama Perusahaan:</label>
            <input type="text" class="form-control suplier" id="name">
        </div>
        <div class="col-md-6 mb-3">
            <label for="jenisUsaha" class="form-label">Jenis Usaha:</label>
            <input type="text" class="form-control suplier" id="jenisUsaha">
        </div>
    </div>

    <div class="row">
        <div class="col-md-6 mb-3">
            <label for="email" class="form-label">Email:</label>
            <div class="input-group">
                <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                <input type="email" class="form-control suplier" id="email">
            </div>
        </div>
        <div class="col-md-6 mb-3">
            <label for="npwp" class="form-label">NPWP:</label>
            <input type="text" class="form-control suplier" id="npwp">
        </div>
    </div>

    <div class="row">
        <div class="col-md-6 mb-3">
            <label for="kota" class="form-label">Kota:</label>
            <input type="text" class="form-control suplier" id="kota">
        </div>
        <div class="col-md-6 mb-3">
            <label for="provinsi" class="form-label">Provinsi:</label>
            <input type="text" class="form-control suplier" id="provinsi">
        </div>
    </div>

    <div class="row">
        <div class="col-md-6 mb-3">
            <label for="kodePos" class="form-label">Kode Pos:</label>
            <input type="text" class="form-control suplier" id="kodePos">
        </div>
        <div class="col-md-6 mb-3">
            <label for="negara" class="form-label">Negara:</label>
            <input type="text" class="form-control suplier" id="negara">
        </div>
    </div>

    <div class="mb-3">
        <label for="alamat" class="form-label">Alamat:</label>
        <textarea class="form-control suplier" id="alamat" rows="3"></textarea>
    </div>

    <div class="row">
        <div class="col-md-6 mb-3">
            <label for="phone" class="form-label">Telepon:</label>
            <div class="input-group">
                <span class="input-group-text"><i class="fas fa-phone"></i></span>
                <input type="tel" class="form-control suplier" id="phone">
            </div>
        </div>
        <div class="col-md-6 mb-3">
            <label for="website" class="form-label">Website:</label>
            <div class="input-group">
                <span class="input-group-text"><i class="fas fa-globe"></i></span>
                <input type="url" class="form-control suplier" id="website">
            </div>
        </div>
    </div>

    <hr>

    <h4 class="mb-4">Kontak Utama</h4>
    <div class="row">
        <div class="col-md-4 mb-3">
            <label for="kontakUtama" class="form-label">Nama:</label>
            <input type="text" class="form-control suplier" id="kontakUtama">
        </div>
        <div class="col-md-4 mb-3">
            <label for="kontakJabatan" class="form-label">Jabatan:</label>
            <input type="text" class="form-control suplier" id="kontakJabatan">
        </div>
        <div class="col-md-4 mb-3">
            <label for="status" class="form-label">Status:</label>
            <select class="form-control suplier" id="status">
                <option value="1">Aktif</option>
                <option value="0">Non Aktif</option>
            </select>
        </div>
    </div>

    <div class="mb-3">
        <label for="kontakAlamat" class="form-label">Alamat:</label>
        <textarea class="form-control suplier" id="kontakAlamat" rows="3"></textarea>
    </div>

    <div class="row">
        <div class="col-md-12">
            <button class="btn btn-primary poppins" id="save-form" data-action="save-form">Simpan Suplier</button>
            <button class="btn btn-danger poppins" id="cancel-form" data-action="cancel-form">Kembali</button>
        </div>
    </div>

</div>
