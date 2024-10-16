<?php

namespace App\Http\Controllers\api\v1\master;

use App\Http\Controllers\Controller;
use App\Http\Requests\api\v1\master\TransaksiPembayaranRequest;
use App\Services\api\TransaksiPembayaranServices;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TransaksiController extends Controller
{
    protected TransaksiPembayaranServices $transaksiPembayaranServices;

    function __construct(TransaksiPembayaranServices $transaksiPembayaranServices)
    {
        $this->transaksiPembayaranServices = $transaksiPembayaranServices;
    }

    function getTransaksiPembayaran(int $itemPage, int $startPage): JsonResponse
    {
        return $this->transaksiPembayaranServices->get_data($itemPage, $startPage);
    }

    function addTransaksiPembayaran(TransaksiPembayaranRequest $transaksiPembayaranRequest): JsonResponse
    {
        return $this->transaksiPembayaranServices->add_data($transaksiPembayaranRequest);
    }

    function updateTransaksiPembayaran(TransaksiPembayaranRequest $transaksiPembayaranRequest, int $id): JsonResponse
    {
        return $this->transaksiPembayaranServices->update_data($transaksiPembayaranRequest, $id);
    }

    function deleteTransaksiPembayaran(int $id): JsonResponse
    {
        return $this->transaksiPembayaranServices->delete_data($id);
    }
    function detailTransaksiPembayaran(int $id): JsonResponse
    {
        return $this->transaksiPembayaranServices->detail_data($id);
    }
}
