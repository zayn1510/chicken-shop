<?php
namespace App\Services\api;
use App\Http\Requests\api\v1\master\MediaProdukRequest;
use App\Http\Requests\api\v1\master\ProfilRequest;
use App\Models\api\v1\master\KonfirmasiPembayaranModel;
use App\Models\api\v1\master\MediaProdukModels;
use App\Models\api\v1\master\WebsiteModel;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ProfilServices
{



    public function updateProfiles(ProfilRequest $profilRequest): JsonResponse
    {
        try {

            $update = WebsiteModel::where("id", $profilRequest->id)->first();
            if (!empty($profilRequest->file("logo"))) {
                $logo = $profilRequest->file("logo");
                $logodb = time() . '.' . $logo->getClientOriginalExtension();
                $directoryPath = 'website/logo/';
                $logo->move($directoryPath, $logodb);
                $update->logo = $logodb;
            }
            if (!empty($profilRequest->file("image"))) {
                $photo = $profilRequest->file("image");
                $photodb = time() . '.' . $photo->getClientOriginalExtension();
                $directoryPath = 'website/image/';
                $photo->move($directoryPath, $photodb);
                $update->image = $photodb;
            }

            $update->name = $profilRequest->name;
            $update->website = $profilRequest->website;
            $update->address = $profilRequest->address;
            $update->phone = $profilRequest->phone;
            $update->email = $profilRequest->email;
            $update->description = $profilRequest->description;
            $update->save();
            return response()->json(
                [
                    "message" => "Success",
                    "success" => true,
                    "payloads" => $profilRequest->validated()
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

    public function showPhoto(int $id): BinaryFileResponse
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