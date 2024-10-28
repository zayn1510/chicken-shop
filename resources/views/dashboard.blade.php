<x-master.layout.header :title="$data['title']" :user="$data['user']" :website="$data['website']" />
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
                                    <h3>{{ $data['card']['ayam'] }}</h3>
                                    <p class="poppins">Ayam</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-th-large"></i>
                                </div>
                                <a href="{{ url('admin/dashboard/ayam') }}"
                                    class="small-box-footer poppins">Selengkapnya <i
                                        class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-5">
                            <!-- small box -->
                            <div class="small-box bg-danger">
                                <div class="inner">
                                    <h3>{{ $data['card']['stok_masuk'] }}</h3>

                                    <p class="poppins">Stok Masuk</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-shopping-cart"></i>
                                </div>
                                <a href="{{ url('admin/dashboard/stok/masuk') }}"
                                    class="small-box-footer poppins">Selengkapnya <i
                                        class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-5">
                            <!-- small box -->
                            <div class="small-box bg-warning">
                                <div class="inner">
                                    <h3>{{ $data['card']['stok_keluar'] }}</h3>
                                    <p class="poppins">Stok Keluar</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-box"></i>
                                </div>
                                <a href="{{ url('admin/dashboard/stok/keluar') }}"
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
                                <div class="col-xl-6 col-md-6 col-lg-6">
                                    <p class="poppins bold">Daftar Stok Masuk</p>
                                    <table class="table table-bordered" id="example1">
                                        <thead>
                                            <tr class="text-center poppins font-13">
                                                <th>No</th>
                                                <th>Ayam</th>
                                                <th>Stok</th>
                                                <th>Tanggal Masuk</th>
                                            </tr>
                                        </thead>
                                        <tbody>
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

                                <div class="col-xl-6 col-md-6 col-lg-6">
                                    <p class="poppins bold">Daftar Stok Keluar</p>
                                    <table class="table table-bordered" id="example1">
                                        <thead>
                                            <tr class="text-center poppins font-13">
                                                <th>No</th>
                                                <th>Ayam</th>
                                                <th>Stok</th>
                                                <th>Tanggal Masuk</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
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
