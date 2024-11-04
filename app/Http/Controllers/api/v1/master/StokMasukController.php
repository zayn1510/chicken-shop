<?php

namespace App\Http\Controllers\api\v1\master;

use App\Http\Controllers\Controller;
use App\Http\Requests\api\v1\master\StokMasukRequest;
use App\Services\api\StokMasukServices;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StokMasukController extends Controller
{
    protected StokMasukServices $stokmasuk;

    function __construct(StokMasukServices $stokMasukServices) {
        $this->stokmasuk=$stokMasukServices;
    }

    function getData(int $itemPage, int $startPage,int $jenis_ayam): JsonResponse {
        return $this->stokmasuk->get_data($itemPage,$startPage,$jenis_ayam);
    }

    function getDataByStokMasuk(int $itemPage,int $startPage,int $jenis_ayam,int $jenis_stok,string $startdate,string $enddate): JsonResponse {
        return $this->stokmasuk->get_data_by_stok_masuk($itemPage,$startPage,$jenis_ayam,$jenis_stok,$startdate,$enddate);
    }

    function filterData(int $itemPage, int $startPage,string $search): JsonResponse {
        return $this->stokmasuk->filter_data($itemPage,$startPage,$search);
    }

    function addData(StokMasukRequest $stokMasukRequest):JsonResponse {
        return $this->stokmasuk->add_data($stokMasukRequest);
    }

    function updateData(StokMasukRequest $stokMasukRequest,int $id):JsonResponse{
        return $this->stokmasuk->update_data($stokMasukRequest,$id);
    }

    function deleteData(int $id):JsonResponse {
        return $this->stokmasuk->delete_data($id);
    }

    function detailData(int $id):JsonResponse {
        return $this->stokmasuk->detail_data($id);
    }
}
