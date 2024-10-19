<?php
namespace App\Services\api;
use App\Http\Requests\api\v1\master\KonfirmasiPembayaran;
use App\Http\Requests\api\v1\master\TransaksiPembayaranRequest;
use App\Models\api\v1\master\KonfirmasiPembayaranModel;
use App\Models\api\v1\master\TransaksiPembayaran;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class TransaksiPembayaranServices
{
    function get_data(int $itempage, int $startPage): JsonResponse
    {
        try {
            $data = TransaksiPembayaran::with(['metode', 'bank', 'orders.order_details',"orders.customers"])->paginate($itempage, ["*"], "page", $startPage);

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


    function detail_transaksi(string $nomor,int $digit): JsonResponse
    {
        try {
            $id = substr($nomor, -$digit);
            $data = TransaksiPembayaran::with(['metode', 'bank', 'orders.order_details.ayam',"orders.customers","konfirmasi_pembayaran"])->
                where("id", $id)->first();
            return response()->json(
                [
                    "message" => "success",
                    'data' => $data
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

    function konfirmasi_pembayaran(KonfirmasiPembayaran $konfirmasiPembayaran):JsonResponse
    {
        try {

            if (!empty($konfirmasiPembayaran->file("foto"))) {
                $photo = $konfirmasiPembayaran->file("foto");
                $photodb = time() . '.' . $photo->getClientOriginalExtension();
                $directoryPath = 'transaksi/' . $konfirmasiPembayaran->transaksi;
                $photo->move(($directoryPath), $photodb);

                $update = KonfirmasiPembayaranModel::where("id", $konfirmasiPembayaran->idfoto)->first();

                KonfirmasiPembayaranModel::create([
                    'transaksi' => $konfirmasiPembayaran->transaksi,
                    'foto_pembayaran' => $photodb,
                    'status' => $konfirmasiPembayaran->status,
                ]);

            }
            return response()->json(
                [
                    "message" => "Success",
                    "success" => true,
                ]
            );


        } catch (\Throwable $th) {
            return response()->json(
                [
                    "message" => "Failed " . $th->getMessage(),
                    "success" => false
                ]
            );
        }
    }
    public function showKonfirmasiPembayaran(int $id):BinaryFileResponse
    {
        $photo = KonfirmasiPembayaranModel::find($id);

        
        if (!$photo) {
            abort("404", "Data not found");
        }

        $path = public_path("transaksi/" . $photo->transaksi . "/" . $photo->foto_pembayaran);


        if (!file_exists($path)) {
            abort("404", "Path not found");
        }
        return response()->file($path);
    }
    

}