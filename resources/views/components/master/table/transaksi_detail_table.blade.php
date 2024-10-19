<div class="detail-transaksi-table hide font-12">
    <div class="form-container">
        <div class="row">
            <div class="col-md-10">
                <h3 class="font-14 bold">Detail Transaksi</h3>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-danger" data-action="kembali">Kembali</button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-12">
                <h4 class="poppins bold">Order</h4>
                <table class="table poppins font-12" id="table-stok">
                    <thead>
                        <tr>
                            <th>Nomor Order</th>
                            <th>:</th>
                            <td id="nomor_orders"></td>
                        </tr>
                        <tr>
                            <th>Customers</th>
                            <th>:</th>
                            <td id="customers"></td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <th>:</th>
                            <td id="total"></td>
                        </tr>

                        <tr>
                            <th>Status</th>
                            <th>:</th>
                            <td id="status"></td>
                        </tr>
                        
                    </thead>
                </table>
            </div>
            <div class="col-md-12 mb-12">
                <h4 class="poppins bold">Detail Order</h4>
                <table class="table table-bordered poppins font-12" id="table-stok">
                    <thead>
                        <tr class="text-center">
                            <th>No</th>
                            <th>Ayam</th>
                            <th>Jumlah</th>
                            <th>Harga</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody id="tbodydetail">

                    </tbody>
                </table>
            </div>
            <div class="col-md-12 mb-12">
                <h4 class="poppins bold">Konfirmasi Pembayaran</h4>
                <table class="table table-bordered poppins font-12" id="table-stok">
                    <thead>
                        <tr class="text-center">
                            <th>No</th>
                            <th>Metode</th>
                            <th>Bank</th>
                            <th>Foto Pembayaran</th>
                            <th>Tanggal</th>
                        </tr>
                    </thead>
                    <tbody id="tbodykonfirmasi">

                    </tbody>
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
                    <label for="jenis_stok" class="form-label font-12">Jenis Stok</label>
                    <select class="form-control font-12 stok" id="jenis_stok" name="jenis_stok">
                        <option value="0">Pilih Jenis Stok</option>
                        <option value="1">Stok Masuk</option>
                        <option value="2">Stok Keluar</option>
                    </select>
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
