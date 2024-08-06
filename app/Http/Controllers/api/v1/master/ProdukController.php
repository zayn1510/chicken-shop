<?php

namespace App\Http\Controllers\api\v1\master;

use App\Http\Controllers\Controller;
use App\Http\Requests\master\StoreProductRequest;
use App\Services\api\ProdukService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProdukController extends Controller
{
    protected ProdukService $produkService;

    function __construct(ProdukService $produkService)
    {
        $this->produkService=$produkService;
    }

    function getProduk(int $itemPage,int $startPage):JsonResponse
    {
       return $this->produkService->get_product($itemPage,$startPage);
    }

    function saveProduk(StoreProductRequest $storeProductRequest):JsonResponse
    {
        return $this->produkService->store_product($storeProductRequest);
    }

    function updateProduk(StoreProductRequest $storeProductRequest,int $id):JsonResponse
    {
        return $this->produkService->update_product($storeProductRequest,$id);
    }

    function deleteProduk(int $id) : JsonResponse
    {
        return $this->produkService->delete_product($id);
    }

    function detailProduk(int $id): JsonResponse
    {
        return $this->produkService->detail_product($id);
    }

    
}
