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

Route::get("/", [Page::class, "login"]);
Route::group(['prefix' => 'dashboard'], function () {
    Route::get("/", [Page::class, "dashboard"])->name("dashboard");
    Route::get("users", [Page::class, "users"])->name("dashboard.users");
    Route::get("ayam", [Page::class, "ayam"])->name("dashboard.ayam");
    Route::get("stok/masuk", [Page::class, "stok_masuk_ayam"])->name("dashboard.stok.masuk");
});

Route::post("login", [\App\Http\Controllers\api\v1\AuthController::class, "login"]);