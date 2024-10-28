<?php
namespace App\Services\api;
use App\Http\Requests\api\v1\master\MetodeRequest;
use App\Models\api\v1\master\MetodeModels;
use Illuminate\Http\JsonResponse;
class MetodeService
{

    function get_data(int $itempage, int $startPage): JsonResponse
    {
        try {
            $data = MetodeModels::paginate($itempage, ["*"], "page", $startPage);

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
                    "message" => "error in database " . $th->getLine() . " " . $th->getMessage(),
                    "success" => false,
                ],
                500
            );
        }
    }

    function add_data(MetodeRequest $metodeRequest): JsonResponse
    {
        if (MetodeModels::create($metodeRequest->validated())) {
            return response()->json(
                [
                    "message" => "success",
                    "success" => true,
                    "payloads" => $metodeRequest->validated()
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

    function update_data(MetodeRequest $metodeRequest, int $id): JsonResponse
    {
        if (!MetodeModels::where("id", $id)->first()) {
            return response()->json([
                "message" => "Data not found ",
                "success" => false
            ]);
        }
        $update = MetodeModels::where("id", $id)->first();
        $update->nama_metode = $metodeRequest->nama_metode;
        $update->deskripsi = $metodeRequest->deskripsi;
        $update->save();
        return response()->json([
            "message" => "Success",
            "success" => true
        ]);
    }

    function delete_data(int $id): JsonResponse
    {
        if (MetodeModels::where("id", $id)->delete()) {
            return response()->json(
                [
                    "message" => "success",
                    "success" => true
                ]
            );
        }
        return response()->json(
            [
                "message" => "data not found",
                "success" => false
            ]
        );
    }

    function detail_data(int $id): JsonResponse
    {
        if (!MetodeModels::where("id", $id)->first()) {
            return response()->json(
                [
                    "message" => "Data not found",
                    "success" => false
                ]
            );
        }

        return response()->json(
            [
                "message" => "success",
                "success" => true,
                "data" => MetodeModels::where("id", $id)->first()
            ]
        );
    }
}