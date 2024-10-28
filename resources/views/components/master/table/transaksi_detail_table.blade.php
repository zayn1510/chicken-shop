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
        <div class="row" style="margin-top: 20px;">
            <div class="col-md-12 mb-12">
              <div class="row" style="margin-bottom: 20px;">
                <div class="col-md-10">
                    <h4 class="poppins bold">Order</h4>
                </div>
                <div class="col-md-2">
                    <select class="form-control poppins font-12" id="select_status_pembayaran" name="select_status_pembayaran" data-action="update-status-by-transaksi">
                        <option value="1">Menunggu</option>
                        <option value="2">Sedang Di Proses</option>
                        <option value="3">Pengiriman</option>
                        <option value="4">Selesai</option>
                    </select>
                </div>
                
              </div>
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
                <h4 class="poppins bold" id="title-konfirmasi-bank">Konfirmasi Pembayaran</h4>
                <table class="table table-bordered poppins font-12" id="table-konfirmasi">
                    <thead>
                        <tr class="text-center">
                            <th>No</th>
                            <th>Metode</th>
                            <th>Bank</th>
                            <th>Foto Pembayaran</th>
                            <th>Status</th>
                            <th>Tanggal</th>
                            <th>Aksi</th>
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
<div class="modal fade" id="modalPembayaran" tabindex="-1" aria-labelledby="modalPembayaranLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalPembayaranLabel">Perbarui Foto Pembayaran</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="jenis_stok" class="form-label font-12">Pilih Status</label>
                    <select class="form-control font-12 pembayaran" id="status-pembayaran" name="status">
                        <option value="0">Pilih Status</option>
                        <option value="1">Menunggu</option>
                        <option value="2">Diterima</option>
                        <option value="2">Dibatalkan</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-primary" data-action="update-status">Submit</button>
            </div>
        </div>
    </div>
</div>
