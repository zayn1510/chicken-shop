<div class="row table-product" id="table-data">
    <div class="col-md-10">
        <div class="row">
            <div class="col-md-12 font-12 bold">
                <div class="container-show">
                    <p class="left-content poppins">Show</p>
                    <select class="right-content form-control poppins font-12" id="itemPage">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <!-- Add more options as needed -->
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 pull-right">
        <div class="row">
            <div class="col-md-12">
                <input type="search" data-action='search-name' class="form-control poppins font-12" id="search" />
            </div>

        </div>
    </div>
    <div class="col-md-12">
        <table class="table table-bordered poppins font-12">
            <thead>
                <tr class="text-center">
                    <th>No</th>
                    <th>Produk</th>
                    <th>Stok</th>
                    <th>Harga</th>
                    <th>Ukuran Ayam</th>
                    <th>Bagian Ayam</th>
                    <th>Diskon</th>
                    <th>Tanggal Masuk</th>
                    <th>Tanggal Produksi</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
               
            </tbody>
        </table>
        <div class="pagination">
            <button class="arrow" id="prevPage" disabled><span class="nav-text">PREV</span></button>
            <div class="pages">
            </div>
            <button class="arrow" id="nextPage"><span class="nav-text">NEXT</span></button>
        </div>
    </div>
</div>
