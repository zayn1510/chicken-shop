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


    public function login()
    {
        return view("login");
    }

}
