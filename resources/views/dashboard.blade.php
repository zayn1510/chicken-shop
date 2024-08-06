<x-master.layout.header :title="$data['title']" :user="$data['user']" />
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Dasdhboard</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">Dashboard</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>
    <!-- Main content -->
    <section class="content">
        <div class="container-fluid">
            <div class="row">

                <div class="col-12">
                    <!-- / start card -->
                    <div class="row">
                        <div class="col-lg-3 col-5">
                            <!-- small box -->
                            <div class="small-box bg-info">
                                <div class="inner">
                                    <h3>{{ $data['card']['user'] }}</h3>
                                    <p class="poppins">Pengguna</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-user"></i>
                                </div>
                                <a href="{{ url('admin/dashboard/pengguna') }}"
                                    class="small-box-footer poppins">Selengkapnya <i
                                        class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-5">
                            <!-- small box -->
                            <div class="small-box bg-success">
                                <div class="inner">
                                    <h3>{{ $data['card']['kategori'] }}</h3>
                                    <p class="poppins">Kategori</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-th-large"></i>
                                </div>
                                <a href="{{ url('admin/dashboard/kategori') }}"
                                    class="small-box-footer poppins">Selengkapnya <i
                                        class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-5">
                            <!-- small box -->
                            <div class="small-box bg-danger">
                                <div class="inner">
                                    <h3>{{ $data['card']['lapak'] }}</h3>

                                    <p class="poppins">Lapak</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-shopping-cart"></i>
                                </div>
                                <a href="{{ url('admin/dashboard/lapak') }}"
                                    class="small-box-footer poppins">Selengkapnya <i
                                        class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-5">
                            <!-- small box -->
                            <div class="small-box bg-warning">
                                <div class="inner">
                                    <h3>{{ $data['card']['produk'] }}</h3>
                                    <p class="poppins">Produk</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-box"></i>
                                </div>
                                <a href="{{ url('admin/dashboard/produk') }}"
                                    class="small-box-footer poppins">Selengkapnya <i
                                        class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>

                        <!-- ./col -->
                    </div>
                    <!-- / end card -->

                    <!-- / start grafik -->
                    <div class="row">
                        <div class="col-xl-12 col-md-12">
                            <div class="row" id="konten-grafik">
                                <div class="col-xl-12 col-md-12 col-lg-12">
                                    <p class="poppins bold">Daftar Produk ({{ $data['card']['produk'] }})</p>
                                    <table class="table table-bordered" id="example1">
                                        <thead>
                                            <tr class="text-center poppins font-13">
                                                <th>No</th>
                                                <th>Produk</th>
                                                <th>Kategori</th>
                                                <th>Pelapak</th>
                                                <th>Harga Produk</th>
                                                <th>Tanggal Berakhir</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="text-center poppins font-13" ng-repeat="row in produk">
                                                <td>@{{ $index + 1 }}</td>
                                                <td>@{{ row.nama_produk }}</td>
                                                <td>@{{ row.kategori }}</td>
                                                <td>@{{ row.nama_pelapak }}</td>
                                                <td>@{{ row.harga_awal | currency: 'IDR ': 0 }}</td>
                                                <td>@{{ row.tgl_berakhir }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="pagination">
                                        <button class="arrow" id="prevPage" disabled>← <span
                                                class="nav-text">PREV</span></button>
                                        <div class="pages">
                                        </div>
                                        <button class="arrow" id="nextPage"><span class="nav-text">NEXT</span>
                                            →</button>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-12">

                            </div>
                        </div>

                    </div>
                </div>
                <!-- / end grafik -->

                <!-- start banner -->

                <!-- end banner -->
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->
</div>
<!-- /.container-fluid -->
</section>
<!-- /.content -->
</div>
<!-- /.content-wrapper -->

<script></script>
<div id="cover-spin"></div>
<x-master.layout.footer />
<script type="module" src="{{ asset('dist/js/admin/dashboard/app.js') }}"></script>
</body>

</html>
