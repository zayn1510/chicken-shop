<x-master.layout.header :title="$data['title']" :user="$data['user']" :website="$data['website']"/>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <p class="poppins font-13 bold">Data Kategori</p>
                </div>
                <div class="col-sm-6 poppins font-13">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">Data Kategori</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content poppins">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card">

                        <!-- /.card-header -->

                        <!-- /.card -->

                        <div class="card">
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-md-10">
                                        <h5 class="font-13 bold">Data Kategori</h5>
                                    </div>

                                    <div class="col-md-2 pull-right">
                                        <button class="btn btn-primary poppins" id="open-form" data-action="open-form"
                                            data-toggle="modal" data-target="#exampleModal">Tambah
                                            Data</button>
                                    </div>
                                </div>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">

                                <div id="table-fakultas" style="font-family:font1;font-size:13px">
                                    <div class="data-kategori">
                                        <x-master.table.kategoritable />
                                    </div>
                                </div>
                                <x-master.modal.kategorimodal />
                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
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

<div id="cover-spin"></div>
<x-master.layout.footer />
<script type="module" src="{{ asset('dist/js/admin/kategori/app.js') }}"></script>
</body>

</html>
