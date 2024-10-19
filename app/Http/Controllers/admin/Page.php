<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\api\v1\master\JenisAyamModels;
use App\Models\api\v1\master\StokModels;
use Illuminate\Http\Request;

class Page extends Controller
{

    public function dashboard()
    {
        $data["title"] = "Dashboard";
        $data["user"] = (object) [
            "name" => "Admin"
        ];
        $data["card"] = [
            "user" => 10,
            "ayam" => JenisAyamModels::count(),
            "stok_masuk" => StokModels::sum("jumlah"),
            "stok_keluar" => 10,
        ];
        return view("dashboard", compact("data"));
    }

    public function users()
    {
        $data["title"] = "Pengguna";
        $data["user"] = (object) [
            "name" => "Admin"
        ];
        return view("components.master.template.user", compact("data"));
    }


    public function ayam()
    {
        $data["title"] = "Ayam";
        $data["user"] = (object) [
            "name" => "Admin"
        ];
        return view("components.master.template.jenisayam", compact("data"));
    }

    public function tambah_stok_ayam()
    {
        $data["title"] = "Tambah Stok Ayam";
        $data["user"] = (object) [
            "name" => "Admin"
        ];
        return view("components.master.template.product", compact("data"));
    }

    public function stok_masuk_ayam()
    {
        $data["title"] = "Stok Masuk Ayam";
        $data["user"] = (object) [
            "name" => "Admin"
        ];
        return view("components.master.template.stok_masuk", compact("data"));
    }

    public function bank()
    {
        $data["title"] = "Bank";
        $data["user"] = (object) [
            "name" => "Admin"
        ];
        return view("components.master.template.bank_template", compact("data"));
    }

    public function metode()
    {
        $data["title"] = "Metode";
        $data["user"] = (object) [
            "name" => "Admin"
        ];
        return view("components.master.template.metode_template", compact("data"));
    }

    public function admin()
    {
        return view("login");
    }

    public function home()
    {
        return view("user.home");
    }

    public function pesan()
    {
        return view("user.pesan");
    }
    public function daftar()
    {
        return view("user.daftar");
    }

    public function login()
    {
        return view("user.login");
    }

    public function user_created()
    {
        return view("user.regis_success");
    }

    public function user_transaksi(string $nomorOrder,int $digit)
    {
        $data["nomor"] = $nomorOrder;
        $data["digit"] = $digit;
        
        return view("user.transaksi", compact("data"));
    }

    public function admin_transaksi()
    {
        $data["title"] = "Transaksi Pembayaran";
        $data["user"] = (object) [
            "name" => "Admin"
        ];
        return view("components.master.template.transaksi_pembayaran",compact("data"));
    }

}
