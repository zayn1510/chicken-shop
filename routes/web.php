<?php

use App\Http\Controllers\admin\Page;

use Illuminate\Support\Facades\Route;

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

Route::get("admin/login", [Page::class, "admin"]);
Route::group(['prefix' => 'dashboard'], function () {
    Route::get("/", [Page::class, "dashboard"])->name("dashboard");
    Route::get("users", [Page::class, "users"])->name("dashboard.users");
    Route::get("ayam", [Page::class, "ayam"])->name("dashboard.ayam");
    Route::get("stok/masuk", [Page::class, "stok_masuk_ayam"])->name("dashboard.stok.masuk");
    Route::get("bank", [Page::class, "bank"])->name("dashboard.bank");
    Route::get("metode", [Page::class, "metode"])->name("dashboard.metode");
    Route::get("transaksi-pembayaran", [Page::class, "admin_transaksi"])->name("dashboard.transaksi.pembayaran");
    
});
Route::get("/", [Page::class, "home"])->name("home");
Route::get("/pesan", [Page::class, "pesan"])->name("pesan");
Route::get("/daftar", [Page::class, "daftar"])->name("daftar");
Route::get("/login-user", [Page::class, "login"])->name("login-user");
Route::get("/regis-success", [Page::class, "user_created"]);
Route::get("/user-transaksi/{nomor}/{digit}", [Page::class, "user_transaksi"]);



Route::post("login", [\App\Http\Controllers\api\v1\AuthController::class, "login"]);

