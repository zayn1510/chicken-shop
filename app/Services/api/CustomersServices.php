<?php

namespace App\Services\api;
use App\Http\Requests\api\v1\master\CustomersRequest;
use App\Models\api\v1\master\CustomersModels;
use App\Models\master\ProdukModel;
use App\View\Components\master\template\User;
use Illuminate\Http\JsonResponse;
use DB;
class CustomersServices
{
    public function get_customers(int $itemPage, int $startPage): JsonResponse
    {
        try {
            $customers = \App\Models\User::with('customer')
            ->where("roles",1)
            ->paginate($itemPage, ['*'], 'page', $startPage);
            return response()->json(
                [
                    "message" => "success",
                    "success" => true,
                    'totalItems' => $customers->total(),
                    'totalPages' => $customers->lastPage(),
                    'itemsPerPage' => $itemPage,
                    "currentPage"=> $customers->currentPage(),
                    'data' => $customers->items(),
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

    public function create_user(CustomersRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            $userData= [
                "name"=>$request->nama_lengkap,
                "email"=>$request->email,
                "password"=>$request->password,
                "username"=>$request->username,
                "roles"=>$request->roles
            ];
            $user=\App\Models\User::create($userData);
            $userid=$user->id;
            $customers = [
                "userid" => $userid,
                "nama_lengkap"=>$request->nama_lengkap,
                "phone" => $request->phone,
                "alamat" => $request->alamat,
                "postal_kode" => $request->postal_kode
            ];
            CustomersModels::create($customers);
            DB::commit();
            return response()->json(
                [
                    "message" => "success",
                    "success" => true,
                ]
            );
        } catch (\ErrorException $th) {
            DB::rollBack();
            return response()->json(
                [
                    "messsage" => "failed",
                    "success" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public function delete_customers(int $id):JsonResponse
    {
        try {
            DB::beginTransaction();
            \App\Models\User::whereRaw("id =?",[$id])->delete();
            CustomersModels::whereRaw("userid = ?",[$id])->delete();
            DB::commit();
            return response()->json(
                [
                    "success" => true,
                    "message" => "success"
                ]
            );
        } catch (\Throwable $th) {
            DB::rollBack();
          return response()->json(
            [
                "success" => false,
                "message" => "error"
            ]
            );
        }
    }

    
}