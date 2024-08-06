<?php

use App\Http\Controllers\api\v1\AuthController;
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

Route::post("login",[AuthController::class,"login"]);
Route::prefix("v1")->group(function(){
    Route::prefix("produk")->group(function(){
        Route::get("/{a}/{b}",[ProdukController::class,"getProduk"]);
        Route::get("/{a}",[ProdukController::class,"detailProduk"]);
        Route::post("/",[ProdukController::class,"saveProduk"]);
        Route::put("/{id}",[ProdukController::class,"updateProduk"]);
        Route::delete("{id}",[ProdukController::class,"deleteProduk"]);
    });
});