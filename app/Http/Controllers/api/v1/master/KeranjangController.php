<?php

namespace App\Http\Controllers\api\v1\master;

use App\Http\Controllers\Controller;
use App\Http\Requests\api\v1\master\KeranjangRequest;
use App\Services\api\KeranjangServices;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class KeranjangController extends Controller
{
    protected KeranjangServices $service;

    function __construct(KeranjangServices $keranjangServices)
    {
        $this->service = $keranjangServices;
    }

    function getKeranjang(int $itemPage, int $startPage): JsonResponse
    {
        return $this->service->get_data($itemPage, $startPage);
    }
    function addKeranjang(KeranjangRequest $keranjangRequest): JsonResponse
    {
        return $this->service->add_data($keranjangRequest);
    }
}
