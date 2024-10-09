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

Route::get("dashboard", [Page::class, "dashboard"])->name("dashboard");
Route::get("/", [Page::class, "login"]);
Route::get("users", [Page::class, "users"])->name("users");
Route::get("ayam", [Page::class, "ayam"])->name("ayam");
Route::get("tambah_stok_ayam", [Page::class, "tambah_stok_ayam"])->name("tambah_stok_ayam");
Route::get("tambah_foto_ayam", [Page::class, "tambah_foto_ayam"])->name("tambah_foto_ayam");
Route::post("login", [\App\Http\Controllers\api\v1\AuthController::class, "login"]);