<?php

namespace App\Services\api;
use App\Http\Requests\api\v1\master\StokMasukRequest;
use App\Models\api\v1\master\JenisAyamModels;
use App\Models\api\v1\master\StokModels;
use Illuminate\Http\JsonResponse;
use DB;
class StokMasukServices
{

    function get_data_by_stok_masuk(int $itempage, int $startPage, int $jenis_ayam,int $jenis_stok): JsonResponse
    {
        try {
            $totalstok = 0;
            if ($jenis_ayam == 0) {
                $data = DB::table('stok_ayam')
                    ->join('jenis_ayam', 'stok_ayam.jenis_ayam', '=', 'jenis_ayam.id')
                    ->select('stok_ayam.*', 'jenis_ayam.jenis')
                    ->where("jenis_stok",$jenis_stok)
                    ->paginate($itempage, ['*'], 'page', $startPage);
                $totalstok=StokModels::sum("jumlah");
            } else {
                $data = DB::table('stok_ayam')
                    ->where("jenis_ayam", $jenis_ayam)
                    ->join('jenis_ayam', 'stok_ayam.jenis_ayam', '=', 'jenis_ayam.id')
                    ->select('stok_ayam.*', 'jenis_ayam.jenis')
                    ->where("jenis_stok",$jenis_stok)
                    ->paginate($itempage, ['*'], 'page', $startPage);
               
            }

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
    function get_data(int $itempage, int $startPage, int $jenis_ayam): JsonResponse
    {
        try {

            if ($jenis_ayam == 0) {
                $data = DB::table('stok_ayam')
                    ->join('jenis_ayam', 'stok_ayam.jenis_ayam', '=', 'jenis_ayam.id')
                    ->select('stok_ayam.*', 'jenis_ayam.jenis')
                    ->paginate($itempage, ['*'], 'page', $startPage);
            } else {
                $data = StokModels::where("jenis_ayam", $jenis_ayam)
                    ->paginate($itempage, ["*"], "page", $startPage);
            }

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

    function filter_data(int $itempage, int $startPage, string $search): JsonResponse
    {
        try {
            $data = StokModels::where('jumlah', 'like', "%{$search}%")
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

    function add_data(StokMasukRequest $stokMasukRequest): JsonResponse
    {
        if (StokModels::create($stokMasukRequest->validated())) {
            JenisAyamModels::where("id", $stokMasukRequest->jenis_ayam)->increment('stok', $stokMasukRequest->jumlah);

            return response()->json(
                [
                    "message" => "success",
                    "success" => true,
                    "payloads" => $stokMasukRequest->validated()
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

    function update_data(StokMasukRequest $stokMasukRequest, int $id): JsonResponse
    {
        if (!StokModels::where("id", $id)->first()) {
            return response()->json([
                "message" => "Data not found ",
                "success" => false
            ]);
        }
        $update = StokModels::where("id", $id)->first();
        $stokoriginal = $update->jumlah;
        $newstok = $stokMasukRequest->jumlah - $stokoriginal;
        $update->jenis_ayam = $stokMasukRequest->jenis_ayam;
        $update->tanggal_masuk = $stokMasukRequest->tanggal_masuk;
        $update->save();

        // update stok
        JenisAyamModels::where("id", $stokMasukRequest->jenis_ayam)->increment('stok', $newstok);


        return response()->json([
            "message" => "Success",
            "success" => true
        ]);
    }

    function delete_data(int $id): JsonResponse
    {
        DB::transaction(function () use ($id) {
            $stokdihapus = StokModels::where("id", $id)->first();

            if ($stokdihapus) {
                $stoksekarang = JenisAyamModels::where("id", $stokdihapus->jenis_ayam)->first();
                $newstok = $stoksekarang->stok - $stokdihapus->jumlah;
                JenisAyamModels::where("id", $stokdihapus->jenis_ayam)->update(['stok' => $newstok]);
                StokModels::where("id", $id)->delete();

                // Return response success
                return response()->json([
                    "message" => "Success",
                    "success" => true
                ]);
            }
        });

        return response()->json([
            "message" => "Data not found ",
            "success" => false
        ]);
    }


    function detail_data(int $id): JsonResponse
    {
        if (!StokModels::where("id", $id)->first()) {
            return response()->json([
                "message" => "Data not found ",
                "success" => false
            ]);
        }
        return response()->json([
            "message" => "success",
            "success" => true,
            "data" => StokModels::where("id", $id)->first()
        ]);
    }
}