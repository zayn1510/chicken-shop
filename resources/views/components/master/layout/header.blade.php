<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title }}</title>

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ asset('plugins/fontawesome-free/css/all.min.css') }}">
    <!-- DataTables -->
    <link rel="stylesheet" href="{{ asset('plugins/datatables-bs4/css/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('plugins/datatables-responsive/css/responsive.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('plugins/datatables-buttons/css/buttons.bootstrap4.min.css') }}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{ asset('dist/css/adminlte.min.css') }}">
    <link rel="stylesheet" href="{{ asset('dist/css/style.css') }}">
</head>

<body ng-app="homeApp" class="hold-transition sidebar-mini" ng-controller="homeController">
    <div class="wrapper">
        <!-- Navbar -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light" style="background-color:#007BFF;">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i
                            class="fas fa-bars"></i></a>
                </li>
                <li class="nav-item d-none d-sm-inline-block poppins">
                    <a href="" class="nav-link poppins" style="font-weight: bold;color: white;">Home</a>
                </li>
            </ul>

            <!-- Right navbar links -->
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link poppins" href="#" role="button">

                        <small style="color:white;font-size: 13px;font-weight: bold;margin-top:20px;"
                            id="nama_lengkap">{{ $user->name }}</small>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link poppins" href="{{ url('logout') }}" role="button">
                        <i class="fas fa-exit"></i> <small style="color:white;font-size: 13px;font-weight: bold;">Log
                            out</small>
                    </a>
                </li>
            </ul>
        </nav>
        <!-- /.navbar -->

        <!-- Main Sidebar Container -->
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <!-- Brand Logo -->
            <a href="index.html" class="brand-link">
                <img src="{{ asset('icon.png') }}" class="img-responsive img-logo" alt="User Image">
            </a>

            <!-- Sidebar -->
            <div class="sidebar">
                <!-- Sidebar user (optional) -->
                <p class="title-admin poppins">Administrasi Pasipa</p>

                <!-- SidebarSearch Form -->
                <div class="form-inline">
                    <div class="input-group" data-widget="sidebar-search">
                        <input class="form-control form-control-sidebar" type="search" placeholder="Search"
                            aria-label="Search">
                        <div class="input-group-append">
                            <button class="btn btn-sidebar">
                                <i class="fas fa-search fa-fw"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Sidebar Menu -->
                <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
                        <li class="nav-item menu-open">
                            <a href="{{ url('dashboard') }}" class="nav-link active">
                                <i class="nav-icon fas fa-tachometer-alt"></i>
                                <p class="poppins font-13">
                                    Dashboard
                                    <i class=""></i>
                                </p>
                            </a>

                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">
                                <i class="nav-icon fas fa-table"></i>
                                <p class="poppins font-13">
                                    Data Master
                                    <i class="right fas fa-angle-right mt-nav-5"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <a href="{{ url('users') }}" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p class="poppins font-13">Pengguna</p>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="{{ url('dashboard/ayam') }}" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p class="poppins font-13">Ayam</p>
                                    </a>
                                </li>
                                
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">
                                <i class="nav-icon fas fa-box"></i>
                                <p class="poppins font-13">
                                    Riwayat Stok Ayam
                                    <i class="right fas fa-angle-right"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview">
                                
                                <li class="nav-item">
                                    <a href="{{ url('dashboard/stok/masuk') }}" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p class="poppins font-13">Masuk</p>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="{{ url('admin/dashboard/pemenang') }}" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p class="poppins font-13">Keluar</p>
                                    </a>
                                </li>
                        </li>
                    </ul>
                    </li>
                    <li class="nav-item">
                        <a href="{{ url('admin/dashboard/akun') }}" class="nav-link">
                            <i class="nav-icon fas fa-user"></i>
                            <p class="poppins font-13">
                                Akun
                                <i class=""></i>
                            </p>
                        </a>
                    </li>


                </nav>
                <!-- /.sidebar-menu -->
            </div>
            <!-- /.sidebar -->
        </aside>
