<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\api\v1\master\JenisAyamModels;
use App\Models\api\v1\master\StokModels;
use App\Models\api\v1\master\WebsiteModel;
use Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use DB;
use Carbon\Carbon;
class Page extends Controller
{

    function getDataWebsite()
    {
        $website = WebsiteModel::get()->first();
        $website->urllogo = $path = url("website/logo/" . $website->logo);
        $website->urlimage = $path = url("website/image/" . $website->image);
        return $website;
    }

    public function dashboard()
    {
        $data["title"] = "Dashboard";
        $data["user"] = (object) [
            "name" => Auth::user()->name
        ];
        $data["website"] = $this->getDataWebsite();
        $data["card"] = [
            "user" => 10,
            "ayam" => JenisAyamModels::count(),
            "stok_masuk" => StokModels::where("jenis_stok", 1)->sum("jumlah"),
            "stok_keluar" => StokModels::where("jenis_stok", 2)->sum("jumlah"),
        ];
        return view("dashboard", compact("data"));
    }

    public function users()
    {
        $data["title"] = "Pengguna";
        $data["user"] = (object) [
            "name" => Auth::user()->name
        ];
        $data["website"] = $this->getDataWebsite();
        return view("components.master.template.user", compact("data"));
    }


    public function ayam()
    {
        $data["title"] = "Ayam";
        $data["user"] = (object) [
            "name" => Auth::user()->name
        ];
        $data["website"] = $this->getDataWebsite();
        return view("components.master.template.jenisayam", compact("data"));
    }

    public function tambah_stok_ayam()
    {
        $data["title"] = "Tambah Stok Ayam";
        $data["user"] = (object) [
            "name" => Auth::user()->name
        ];
        $data["website"] = $this->getDataWebsite();
        return view("components.master.template.product", compact("data"));
    }

    public function stok_masuk_ayam()
    {
        $data["title"] = "Stok Masuk Ayam";
        $data["user"] = (object) [
            "name" => Auth::user()->name
        ];
        $data["website"] = $this->getDataWebsite();
        return view("components.master.template.stok_masuk", compact("data"));
    }

    public function bank()
    {
        $data["title"] = "Bank";
        $data["user"] = (object) [
            "name" => Auth::user()->name
        ];
        $data["website"] = $this->getDataWebsite();
        return view("components.master.template.bank_template", compact("data"));
    }

    public function metode()
    {
        $data["title"] = "Metode";
        $data["user"] = (object) [
            "name" => Auth::user()->name
        ];
        $data["website"] = $this->getDataWebsite();
        return view("components.master.template.metode_template", compact("data"));
    }

    public function admin()
    {
        return view("login");
    }

    public function showPhoto(string $file, string $path): BinaryFileResponse
    {

        $path = public_path("website/" . $path . "/" . $file);
        if (!file_exists($path)) {
            abort("404", "Path not found");
        }

        return response()->file($path);
    }
    public function home()
    {
        $website = WebsiteModel::get()->first();
        $website->urllogo = $path = url("website/logo/" . $website->logo);
        $website->urlimage = $path = url("website/image/" . $website->image);
        $data["website"] = $website;
        return view("user.home", compact("data"));
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

    public function user_transaksi(string $nomorOrder, int $digit)
    {
        $data["nomor"] = $nomorOrder;
        $data["digit"] = $digit;

        return view("user.transaksi", compact("data"));
    }

    public function admin_transaksi()
    {
        $data["title"] = "Transaksi Pembayaran";
        $data["user"] = (object) [
            "name" => Auth::user()->name
        ];
        $data["website"] = $this->getDataWebsite();
        return view("components.master.template.transaksi_pembayaran", compact("data"));
    }

    public function admin_akun()
    {
        $data["title"] = "Kelola Akun";
        $data["user"] = (object) [
            "name" => Auth::user()->name
        ];
        $data["website"] = $this->getDataWebsite();
        return view("components.master.template.akun_template", compact("data"));
    }
    public function admin_website()
    {
        $data["title"] = "Kelola Website";
        $data["user"] = (object) [
            "name" => Auth::user()->name
        ];
        $data["website"] = WebsiteModel::get()->first();

        return view("components.master.template.website_template", compact("data"));
    }

    public function admin_stok_keluar()
    {
        $data["title"] = "Riwayat Stok Keluar";
        $data["user"] = (object) [
            "name" => Auth::user()->name
        ];
        $data["website"] = $this->getDataWebsite();
        return view("components.master.template.stok-keluar-template", compact("data"));
    }
    public function admin_laporan(string $ayam, string $startdate, string $enddate, int $jenis_stok)
    {
        $data["title"] = "Laporan Stok Masuk";
        $data["user"] = (object) [
            "name" => Auth::user()->name
        ];
        $website = WebsiteModel::get()->first();
        $website->urllogo = $path = url("website/logo/" . $website->logo);
        $website->urlimage = $path = url("website/image/" . $website->image);
        $data["website"] = $website;
        $laporan = $this->cetakLaporan($ayam, $startdate, $enddate, $jenis_stok);
        $data["laporan"] = $laporan;
        $startdate = Carbon::parse($startdate);
        $enddate = Carbon::parse($enddate);

        if ($startdate->format('m') === $enddate->format('m')) {
            // Jika bulan sama, tampilkan tanggal awal dan akhir dengan format bulan yang sama
            $periode = $startdate->format('j') . ' - ' . $enddate->format('j F Y');
        } else {
            // Jika bulan berbeda, tampilkan bulan yang berbeda
            $periode = $startdate->format('j F') . ' - ' . $enddate->format('j F Y');
        }

        $data["periode"] = $periode;
        return view("components.master.template.laporan_stok", compact("data"));
    }
    private function cetakLaporan(string $ayam, string $startdate, string $enddate, $jenis_stok): array
    {
        $totalstok = 0;
        $query = DB::table('stok_ayam')
            ->join('jenis_ayam', 'stok_ayam.jenis_ayam', '=', 'jenis_ayam.id')
            ->select('stok_ayam.*', 'jenis_ayam.jenis')
            ->where("jenis_stok", $jenis_stok)
            ->whereBetween('stok_ayam.tanggal_masuk', [$startdate, $enddate]);
        if ($ayam !== 'all') {
            $query->where("jenis_ayam", $ayam);
        }
        $data = $query->get()->all();

        return $data;

    }

}
