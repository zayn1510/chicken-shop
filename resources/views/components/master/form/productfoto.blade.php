<div class="product-foto-form hide font-12">
    <div class="form-container">
        <div class="row">
          <div class="col-md-10">
            <h3 class="font-14 bold">Kelola Foto Produk</h3>
          </div>
          <div class="col-md-2">
            <button type="button" class="btn btn-danger"  data-action="kembali">Kembali</button>
          </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-12">
                <table class="table table-bordered poppins font-12" id="table-foto">
                    <thead>
                        <tr class="text-center">
                            <th>No</th>
                            <th>Media</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                </table>
            </div> 
        </div>
    </div>
</div>


<!-- Modal -->
<div class="modal fade" id="modalFoto" tabindex="-1" aria-labelledby="modalFoto" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalFoto">Upload Foto</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <x-master.form.upload-foto />
        </div>
        <div class="modal-footer">
        
          <button type="button" class="btn btn-primary"  data-action="uploadfoto">Upload</button>
        </div>
      </div>
    </div>
  </div>
