<?php

namespace App\Http\Controllers\api\v1\master;

use App\Http\Controllers\Controller;
use App\Http\Requests\api\v1\master\JenisAyamRequest;
use App\Services\api\JenisAyamServices;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JenisAyamController extends Controller
{
    protected JenisAyamServices $jenisAyamServices;

    function __construct(JenisAyamServices $jenisAyamServices) {
        $this->jenisAyamServices = $jenisAyamServices;
    }

    function getData(int $itemPage, int $startPage): JsonResponse {
        return $this->jenisAyamServices->get_data($itemPage,$startPage);
    }

    function filterData(int $itemPage, int $startPage,string $search): JsonResponse {
        return $this->jenisAyamServices->filter_data($itemPage,$startPage,$search);
    }

    function addData(JenisAyamRequest $jenisAyamRequest):JsonResponse {
        return $this->jenisAyamServices->add_data($jenisAyamRequest);
    }

    function updateData(JenisAyamRequest $jenisAyamRequest,int $id):JsonResponse{
        return $this->jenisAyamServices->update_data($jenisAyamRequest,$id);
    }

    function deleteData(int $id):JsonResponse {
        return $this->jenisAyamServices->delete_data($id);
    }

    function detailData(int $id):JsonResponse {
        return $this->jenisAyamServices->detail_data($id);
    }
    
}
