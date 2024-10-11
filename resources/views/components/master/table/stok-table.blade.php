<div class="product-stok hide font-12">
    <div class="form-container">
        <div class="row">
            <div class="col-md-10">
                <h3 class="font-14 bold">Kelola Stok Ayam</h3>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-danger" data-action="kembali">Kembali</button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-12">
                <table class="table table-bordered poppins font-12" id="table-stok">
                    <thead>
                        <tr class="text-center">
                            <th>No</th>
                            <th>Stok</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>


<!-- Modal -->
<div class="modal fade" id="modalStok" tabindex="-1" aria-labelledby="modalStokLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalStokLabel">Kelola Stok</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="jumlah" class="form-label font-12">Jumlah</label>
                    <input type="number" class="form-control font-12 stok" id="jumlah" name="jumlah">
                </div>
                <div class="form-group">
                    <label for="tglmsk" class="form-label  font-12">Tanggal Masuk</label>
                    <input type="date" class="form-control stok  font-12" id="tglmsk" name="tglmsk">
                </div>
            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-primary" data-action="save-stok">Tambahkan</button>
            </div>
        </div>
    </div>
</div>
