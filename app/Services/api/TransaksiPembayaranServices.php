<?php
namespace App\Services\api;
use App\Http\Requests\api\v1\master\TransaksiPembayaranRequest;
use App\Models\api\v1\master\TransaksiPembayaran;
use Illuminate\Http\JsonResponse;

class TransaksiPembayaranServices
{
    function get_data(int $itempage, int $startPage): JsonResponse
    {
        try {
            $data = TransaksiPembayaran::with(['orders.order_details'])->paginate($itempage, ["*"], "page", $startPage);

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

    function add_data(TransaksiPembayaranRequest $transaksiPembayaranRequest): JsonResponse
    {
        if (TransaksiPembayaran::create($transaksiPembayaranRequest->validated())) {
            return response()->json(
                [
                    "message" => "success",
                    "success" => true,
                    "payloads" => $transaksiPembayaranRequest->validated()
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

    function update_data(TransaksiPembayaranRequest $transaksiPembayaranRequest, int $id): JsonResponse
    {
        if (!TransaksiPembayaran::where("id", $id)->first()) {
            return response()->json([
                "message" => "Data not found ",
                "success" => false
            ]);
        }
        $update = TransaksiPembayaran::where("id", $id)->first();
        $update->status = $transaksiPembayaranRequest->status;
        $update->save();
        return response()->json([
            "message" => "Success",
            "success" => true
        ]);
    }

    function delete_data(int $id): JsonResponse
    {
        if (TransaksiPembayaran::where("id", $id)->delete()) {
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
        if (!TransaksiPembayaran::where("id", $id)->first()) {
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
                "data" => TransaksiPembayaran::where("id", $id)->first()
            ]
        );
    }
}