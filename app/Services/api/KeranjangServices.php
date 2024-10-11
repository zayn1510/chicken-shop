<?php
namespace App\Services\api;
use App\Http\Requests\api\v1\master\KeranjangRequest;
use Illuminate\Http\JsonResponse;
use App\Models\api\v1\master\KeranjangModel;
class KeranjangServices 
{
    function get_data(int $itempage, int $startPage): JsonResponse
    {
        try {
           $data=KeranjangModel::with("jenis_ayam")->paginate($itempage,["*"],"page",$startPage);
           
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

    function add_data(KeranjangRequest $keranjangRequest): JsonResponse
    {
        if (KeranjangModel::create($keranjangRequest->validated())) {
            return response()->json(
                [
                    "message" => "success",
                    "success" => true,
                    "payloads" => $keranjangRequest->validated()
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

    function update_data(KeranjangRequest $keranjangRequest, int $id): JsonResponse
    {
        if (!KeranjangModel::where("id", $id)->first()) {
            return response()->json([
                "message" => "Data not found ",
                "success" => false
            ]);
        }
        $update = KeranjangModel::where("id", $id)->first();
        $update->ayam = $keranjangRequest->ayam;
        $update->jumlah=$keranjangRequest->jumlah;
        $update->save();
        return response()->json([
            "message" => "Success",
            "success" => true
        ]);
    }
}