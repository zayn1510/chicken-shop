<?php

use App\Http\Controllers\admin\Page;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\v1\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get("admin/login", [Page::class, "admin"])->name('admin.login');

Route::group(['prefix' => 'dashboard', 'middleware' => ['auth']], function () {
    Route::get("/", [Page::class, "dashboard"])->name("dashboard");
    Route::get("users", [Page::class, "users"])->name("dashboard.users");
    Route::get("ayam", [Page::class, "ayam"])->name("dashboard.ayam");
    Route::get("stok/masuk", [Page::class, "stok_masuk_ayam"])->name("dashboard.stok.masuk");
    Route::get("stok/keluar", [Page::class, "admin_stok_keluar"])->name("dashboard.stok.keluar");
    Route::get("bank", [Page::class, "bank"])->name("dashboard.bank");
    Route::get("akun", [Page::class, "admin_akun"])->name("dashboard.akun");
    Route::get("website", [Page::class, "admin_website"])->name("dashboard.website");
    Route::get("metode", [Page::class, "metode"])->name("dashboard.metode");
    Route::get("transaksi-pembayaran", [Page::class, "admin_transaksi"])->name("dashboard.transaksi.pembayaran"); 
    Route::get("cetak-laporan/{a}/{b}/{c}/{d}", [Page::class, "admin_laporan"])->name("dashboard.cetak.laporan"); 
    
});

Route::get("/", [Page::class, "home"])->name("home");
Route::get("/pesan", [Page::class, "pesan"])->name("pesan");
Route::get("/daftar", [Page::class, "daftar"])->name("daftar");
Route::get("/login-user", [Page::class, "login"])->name("login-user");
Route::get("/regis-success", [Page::class, "user_created"]);
Route::get("/user-transaksi/{nomor}/{digit}", [Page::class, "user_transaksi"]);



Route::post("login", [AuthController::class, "login"]);
Route::get("logout", [AuthController::class, "logOut"]);
Route::post("checkpassword", [AuthController::class,"checkPassword"]);
Route::post("update-admin", [AuthController::class,"updateAkunAdmin"]);


