<?php

use App\Http\Controllers\api\v1\AuthController;
use App\Http\Controllers\api\v1\master\CustomerController;
use App\Http\Controllers\api\v1\master\JenisAyamController;
use App\Http\Controllers\api\v1\master\KeranjangController;
use App\Http\Controllers\api\v1\master\OrderController;
use App\Http\Controllers\api\v1\master\ProdukMediaController;
use App\Http\Controllers\api\v1\master\StokMasukController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\v1\master\ProdukController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post("login", [AuthController::class, "login"]);
Route::prefix("v1")->group(function () {
    Route::prefix("produk")->group(function () {
        Route::get("/{a}/{b}", [ProdukController::class, "getProduk"]);
        Route::get("/{a}", [ProdukController::class, "detailProduk"]);
        Route::post("/", [ProdukController::class, "saveProduk"]);
        Route::put("/{id}", [ProdukController::class, "updateProduk"]);
        Route::delete("{id}", [ProdukController::class, "deleteProduk"]);
        Route::post("/create/photo", [ProdukMediaController::class, "createPhoto"]);
    });

    Route::prefix("photo")->group(function () {
        Route::get("/{a}/{b}/{c}", [ProdukMediaController::class, "getPhoto"])->where(
            [
                "a" => '[0-9]+',
                "b" => '[0-9]+',
                "c" => '[0-9]+'
            ]
        );
        Route::delete("/{a}/{b}", [ProdukMediaController::class, "deleteData"])->where(
            [
                "a" => '[0-9]+',
                "b" => '[0-9]+'
            ]
        );
        Route::get("/{a}", [ProdukMediaController::class, "previewPhoto"])->where(
            [
                "a" => '[0-9]+'
            ]
        );
    });
    Route::prefix("customers")->group(function () {
        Route::get("/{param1}/{param2}", [CustomerController::class, "Customers"])
            ->where([
                'param1' => '[0-9]+',
                'param2' => '[0-9]+'
            ]);
        Route::post("/", [CustomerController::class, "createUser"]);
        Route::delete("/{param1}", [CustomerController::class, "deleteCustomers"])
            ->where([
                'param1' => '[0-9]+'
            ]);
    });

    Route::prefix("jenis")->group(function () {
        Route::get("/{a}/{b}", [JenisAyamController::class, "getData"]);
        Route::get("/{a}/{b}/{c}", [JenisAyamController::class, "filterData"]);
        Route::get("/{a}", [JenisAyamController::class, "detailData"]);
        Route::post("/", [JenisAyamController::class, "addData"]);
        Route::put("/{id}", [JenisAyamController::class, "updateData"]);
        Route::delete("{id}", [JenisAyamController::class, "deleteData"]);
    });
    Route::prefix("stok_masuk")->group(function () {
        Route::get("/{a}/{b}/{c}", [StokMasukController::class, "getData"]);
        Route::get("/{a}", [StokMasukController::class, "detailData"]);
        Route::post("/", [StokMasukController::class, "addData"]);
        Route::put("/{id}", [StokMasukController::class, "updateData"]);
        Route::delete("{id}", [StokMasukController::class, "deleteData"]);
    });
    Route::prefix("stok_masuk_by")->group(function () {
        Route::get("/{a}/{b}/{c}", [StokMasukController::class, "getDataByStokMasuk"]);
    });
    Route::prefix("keranjang-user")->group(function () {
        Route::get("/{a}/{b}", [KeranjangController::class, "getKeranjang"]);
        Route::post("/", [KeranjangController::class, "addKeranjang"]);
    });

    Route::prefix("orders-user")->group(function () {
        Route::get("/{a}/{b}", [OrderController::class, "getOrder"]);
        Route::post("/", [OrderController::class, "orderAyam"]);
    });



});