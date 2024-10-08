<?php

namespace App\Http\Controllers\api\v1\master;

use App\Http\Controllers\Controller;
use App\Http\Requests\api\v1\master\MediaProdukRequest;
use App\Services\api\ProdukFotoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ProdukMediaController extends Controller
{
    protected ProdukFotoService $produkFotoService;

    function __construct(ProdukFotoService $produkFotoService)
    {
        $this->produkFotoService = $produkFotoService;
    }

    function createPhoto(MediaProdukRequest $mediaProdukRequest): JsonResponse
    {

        return $this->produkFotoService->createData($mediaProdukRequest);
    }

    function getPhoto(int $itempage, int $starpage, int $produk_id): JsonResponse
    {
        return $this->produkFotoService->getData($itempage, $starpage, $produk_id);
    }

    function deleteData(int $id, int $produkid): JsonResponse
    {
        return $this->produkFotoService->deletePhoto($id, $produkid);
    }

    function previewPhoto(int $id):BinaryFileResponse{
        return $this->produkFotoService->showPhoto($id);
    }
}
