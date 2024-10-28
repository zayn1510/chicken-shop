<?php

namespace App\Services\Api;
use App\Http\Requests\master\StoreProductRequest;
use App\Models\master\ProdukModel;
use File;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use DB;

class ProdukService
{

    public function get_product(int $itemPage, int $startPage): JsonResponse
    {
        try {
            $produk = DB::table("produk");
            $data = [];
            $totalPages = 0;
            if ($produk->count() > 0) {
                $totalPages = ceil($produk->count() / $itemPage);
                $data = DB::table("produk")
                    ->skip(($startPage - 1) * $itemPage)
                    ->take($itemPage)
                    ->get();
            }
            return response()->json(
                [
                    "message" => "success",
                    "success" => true,
                    'totalItems' => $produk->count(),
                    'totalPages' => $totalPages,
                    'currentPage' => $startPage,
                    'itemsPerPage' => $itemPage,
                    'data' => $data,
                ]
            );
        } catch (\Throwable $th) {
            return response()->json(
                [
                    "message" => "error in database " . $th->getMessage(),
                    "success" => false,
                ]
            );
        }
    }

    function store_product(StoreProductRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            DB::table("produk")->insert($data);
            return response()->json(
                [
                    "message" => "success",
                    "success" => true,
                    "data" => $data
                ]
            );
        } catch (\ErrorException $th) {
            return response()->json(
                [
                    "messsage" => "failed",
                    "success" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    function update_product(StoreProductRequest $request, int $id): JsonResponse
    {
        try {
            $data = $request->validated();
            ProdukModel::findOrFail($id)->update($data);
            return response()->json(
                [
                    "message" => "success",
                    "success" => true
                ]
            );
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Product not found',
                'status' => false,
                'error' => 'Product with ID ' . $id . ' not found',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json(
                [
                    "messsage" => "failed",
                    "success" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    function delete_product(int $id): JsonResponse
    {
        try {
            ProdukModel::findOrFail($id)->delete();
            $path=public_path("produk/".$id);

            if (File::exists($path)) {
                File::deleteDirectory($path);
            }
        
            
            return response()->json(
                [
                    "message" => "success",
                    "success" => true
                ]
            );
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Product not found',
                'status' => false,
                'error' => 'Product with ID ' . $id . ' not found',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json(
                [
                    "messsage" => "failed",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }


    function detail_product(int $id): JsonResponse
    {
        try {
            return response()->json(
                [
                    "message" => "success",
                    "status" => true,
                    "data" => ProdukModel::findOrFail($id)->first()
                ]
            );
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Product not found',
                'status' => false,
                'error' => 'Product with ID ' . $id . ' not found',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json(
                [
                    "messsage" => "failed",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }
}
