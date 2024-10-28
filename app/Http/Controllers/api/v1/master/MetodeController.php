<?php

namespace App\Http\Controllers\api\v1\master;

use App\Http\Controllers\Controller;
use App\Http\Requests\api\v1\master\MetodeRequest;
use App\Services\api\MetodeService;
use Illuminate\Http\JsonResponse;
class MetodeController extends Controller
{
    protected MetodeService $metodeService;

    function __construct(MetodeService $metodeService)
    {
        $this->metodeService = $metodeService;
    }

    function getMetode(int $itemPage, int $startPage): JsonResponse
    {
        return $this->metodeService->get_data($itemPage, $startPage);
    }

    function addMetode(MetodeRequest $metodeRequest): JsonResponse
    {
        return $this->metodeService->add_data($metodeRequest);
    }

    function updateMetode(MetodeRequest $metodeRequest, int $id): JsonResponse
    {
        return $this->metodeService->update_data($metodeRequest, $id);
    }

    function deleteMetode(int $id): JsonResponse
    {
        return $this->metodeService->delete_data($id);
    }
    function detailMetode(int $id): JsonResponse
    {
        return $this->metodeService->detail_data($id);
    }
}
