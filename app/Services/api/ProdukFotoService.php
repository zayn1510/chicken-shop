<?php
namespace App\Services\api;
use App\Http\Requests\api\v1\master\MediaProdukRequest;
use App\Models\api\v1\master\KonfirmasiPembayaranModel;
use App\Models\api\v1\master\MediaProdukModels;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ProdukFotoService
{

    public function getData(int $itemPage, int $startPage, int $produk_id): JsonResponse
    {
        try {
            $produkmedia = MediaProdukModels::where("produk_id", $produk_id)
                ->paginate($itemPage, ['*'], 'page', $startPage);

            return response()->json(
                [
                    "message" => "success",
                    "success" => true,
                    'totalItems' => $produkmedia->total(),
                    'totalPages' => $produkmedia->lastPage(),
                    'itemsPerPage' => $itemPage,
                    "currentPage" => $produkmedia->currentPage(),
                    'data' => $produkmedia->items(),
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

    public function deletePhoto(int $id, int $produkid): JsonResponse
    {
        $data = MediaProdukModels::where("id", $id)->first();
        if (!empty($data)) {
            $directoryPath = 'produk/' . $produkid . "/" . $data->media_url;
            if (MediaProdukModels::where("id", $id)->delete()) {
                if (file_exists($directoryPath)) {
                    unlink($directoryPath);
                }
            }

            return response()->json(
                [
                    "message" => "Success",
                    "success" => true
                ]
            );
        }
        return response()->json(
            [
                "message" => "Failed",
                "success" => false
            ]
        );
    }
    public function createData(MediaProdukRequest $mediaProdukRequest): JsonResponse
    {
        try {

            if (!empty($mediaProdukRequest->file("foto"))) {
                $photo = $mediaProdukRequest->file("foto");
                $photodb = time() . '.' . $photo->getClientOriginalExtension();
                $directoryPath = 'produk/' . $mediaProdukRequest->produk;
                $photo->move(($directoryPath), $photodb);

                $update = MediaProdukModels::where("id", $mediaProdukRequest->idfoto)->first();

                if (!empty($update)) {
                    $pathbefore = public_path($directoryPath . "/" . $update->media_url);
                    if (file_exists($pathbefore)) {
                        unlink($pathbefore);
                    }
                    $update->media_type = $photo->getClientMimeType();
                    $update->media_url = $photodb;
                    $update->thumbnail_url = $photodb;
                    $update->save();
                } else {
                    MediaProdukModels::create([
                        'produk_id' => $mediaProdukRequest->produk,
                        'media_type' => $photo->getClientMimeType(),
                        'media_url' => $photodb,
                        'thumbnail_url' => $photodb
                    ]);
                }

            }
            return response()->json(
                [
                    "message" => "Success",
                    "success" => true,
                    "payloads" => $mediaProdukRequest->validated()
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

    public function showPhoto(int $id):BinaryFileResponse
    {
        $photo = MediaProdukModels::find($id);

        if (!$photo) {
            abort("404", "Data not found");
        }

        $path = public_path("produk/" . $photo->produk_id . "/" . $photo->media_url);
        if (!file_exists($path)) {
            abort("404", "Path not found");
        }
        return response()->file($path);
    }

  
}