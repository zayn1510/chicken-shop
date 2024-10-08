<div class="modal fade" id="jenisModal" tabindex="-1" aria-labelledby="JenisModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="jenisModalLabel">Form Jenis Ayam</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group poppins">
                    <label class="font-12">Jenis Ayam</label>
                    <input type="text" class="form-control font-12 jenis" id="jenis" />
                </div>
                <div class="form-group poppins">
                    <label class="font-12">Keterangan</label>
                    <textarea class="form-control font-12 jenis" id="keterangan"></textarea>
                </div>
                <div class="form-group poppins">
                    <label class="font-12">Berat</label>
                    <input type="number" class="form-control font-12 jenis" id="berat" />
                </div>
                <div class="form-group poppins">
                    <label class="font-12">Harga</label>
                    <input type="text" class="form-control font-12 jenis" data-action="price-action" id="harga" />
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-action="save-form" id="save-form">Save</button>
            </div>
        </div>
    </div>
</div>
