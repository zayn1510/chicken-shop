<?php

namespace App\Services\api;
use App\Http\Requests\api\v1\master\JenisAyamRequest;
use App\Models\api\v1\master\JenisAyamModels;
use Illuminate\Http\JsonResponse;

class JenisAyamServices
{

    function get_data(int $itempage, int $startPage): JsonResponse
    {
        try {
            $data = JenisAyamModels::with("produk_media")->paginate($itempage, ["*"], "page", $startPage);
            return response()->json(
                [
                    "message" => "success",
                    "success" => true,
                    'totalItems' => $data->total(),
                    'totalPages' => $data->lastPage(),
                    'itemsPerPage' => $itempage,
                    "currentPage" => $data->currentPage(),
                    'data' => $data->items(),
                ]
            );
        } catch (\Throwable $th) {
            return response()->json(
                [
                    "message" => "error in database " . $th->getLine(),
                    "success" => false,
                ],
                500
            );
        }
    }

    function filter_data(int $itempage, int $startPage, string $search): JsonResponse
    {
        try {
            $data = JenisAyamModels::where('jenis', 'like', "%{$search}%")
                ->paginate($itempage, ["*"], "page", $startPage);
            return response()->json(
                [
                    "message" => "success",
                    "success" => true,
                    'totalItems' => $data->total(),
                    'totalPages' => $data->lastPage(),
                    'itemsPerPage' => $itempage,
                    "currentPage" => $data->currentPage(),
                    'data' => $data->items(),
                ]
            );
        } catch (\Throwable $th) {
            return response()->json(
                [
                    "message" => "error in database " . $th->getLine(),
                    "success" => false,
                ],
                500
            );
        }
    }

    function add_data(JenisAyamRequest $jenisAyamRequest): JsonResponse
    {
        if (JenisAyamModels::create($jenisAyamRequest->validated())) {
            return response()->json(
                [
                    "message" => "success",
                    "success" => true,
                    "payloads" => $jenisAyamRequest->validated()
                ]
            );
        }
        return response()->json(
            [
                "message" => "Failed",
                "success" => false,
            ]
        );
    }

    function update_data(JenisAyamRequest $jenisAyamRequest, int $id): JsonResponse
    {
        if (!JenisAyamModels::where("id", $id)->first()) {
            return response()->json([
                "message" => "Data not found ",
                "success" => false
            ]);
        }
        $update = JenisAyamModels::where("id", $id)->first();
        $update->jenis = $jenisAyamRequest->jenis;
        $update->keterangan = $jenisAyamRequest->keterangan;
        $update->berat = $jenisAyamRequest->berat;
        $update->harga = $jenisAyamRequest->harga;
        $update->save();
        return response()->json([
            "message" => "Success",
            "success" => true
        ]);
    }

    function delete_data(int $id): JsonResponse
    {
        if (JenisAyamModels::where("id", $id)->delete()) {
            return response()->json([
                "message" => "Success",
                "success" => true
            ]);
        }

        return response()->json([
            "message" => "Data not found ",
            "success" => false
        ]);
    }


    function detail_data(int $id): JsonResponse
    {
        if (!JenisAyamModels::where("id", $id)->first()) {
            return response()->json([
                "message" => "Data not found ",
                "success" => false
            ]);
        }
        return response()->json([
            "message" => "success",
            "success" => true,
            "data" => JenisAyamModels::where("id", $id)->first()
        ]);
    }
}