<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
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
            "kategori" => 10,
            "produk" => 10,
            "lapak" => 10,
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

    public function kategori()
    {
        $data["title"] = "Kategori";
        $data["user"] = (object) [
            "name" => "Admin"
        ];
        return view("components.master.template.kategori", compact("data"));
    }

    public function satuan()
    {
        $data["title"] = "";
        $data["title"] = "Satuan";
        $data["user"] = (object) [
            "name" => "Admin"
        ];
        return view("components.master.template.satuan", compact("data"));
    }


    public function suplier()
    {
        $data["title"] = "Suplier";
        $data["user"] = (object) [
            "name" => "Admin"
        ];
        return view("components.master.template.suplier", compact("data"));
    }
    public function product()
    {
        $data["title"] = "Product";
        $data["user"] = (object) [
            "name" => "Admin"
        ];
        return view("components.master.template.product", compact("data"));
    }


    public function login()
    {
        return view("login");
    }

}
