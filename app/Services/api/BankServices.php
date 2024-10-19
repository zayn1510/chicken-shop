<?php
namespace App\Services\api;
use App\Http\Requests\api\v1\master\BankRequest;
use App\Models\api\v1\master\BankModel;
use Illuminate\Http\JsonResponse;
class BankServices
{

    function get_data(int $itempage, int $startPage): JsonResponse
    {
        try {
            $data = BankModel::paginate($itempage, ["*"], "page", $startPage);

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

    function add_data(BankRequest $bankRequest): JsonResponse
    {
        if (BankModel::create($bankRequest->validated())) {
            return response()->json(
                [
                    "message" => "success",
                    "success" => true,
                    "payloads" => $bankRequest->validated()
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

    function update_data(BankRequest $bankRequest, int $id): JsonResponse
    {
        if (!BankModel::where("id", $id)->first()) {
            return response()->json([
                "message" => "Data not found ",
                "success" => false
            ]);
        }
        $update = BankModel::where("id", $id)->first();
        $update->nama_bank = $bankRequest->nama_bank;
        $update->nomor_rekening = $bankRequest->nomor_rekening;
        $update->atas_nama = $bankRequest->atas_nama;
        $update->save();
        return response()->json([
            "message" => "Success",
            "success" => true
        ]);
    }

    function delete_data(int $id): JsonResponse
    {
        if (BankModel::where("id", $id)->delete()) {
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
        if (!BankModel::where("id", $id)->first()) {
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
                "data" => BankModel::where("id", $id)->first()
            ]
        );
    }

}