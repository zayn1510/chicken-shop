<?php
namespace App\Services\Auth;

use App\Http\Requests\api\v1\master\PasswordRequest;
use App\Http\Requests\api\v1\master\UpdateAdminRequest;
use App\Http\Requests\AuthRequest;
use App\Models\User;
use Hash;
use Illuminate\Http\JsonResponse;
use Auth;

class AuthService
{
    function loginAdmin(AuthRequest $authRequest): JsonResponse
    {
        $credentials = $authRequest->validated();

        if (Auth::attempt($credentials)) {
            return response()->json(
                [
                    "message" => "success",
                    "status" => true,
                    "user" => Auth::user()->id
                ]
            );
        }
        return response()->json(
            [
                "message" => "failed",
                "status" => false
            ]
        );
    }

    function loginUer(AuthRequest $authRequest): JsonResponse
    {
        $credentials = $authRequest->validated();
        if (Auth::attempt($credentials)) {
            return response()->json(
                [
                    "message" => "success",
                    "status" => true,
                    "role" => Auth::user()->roles,
                    "user" => Auth::user()->id
                ]
            );
        }
        return response()->json(
            [
                "message" => "failed",
                "status" => false
            ]
        );
    }

    function check_password(PasswordRequest $passwordRequest): JsonResponse
    {
        $currentHashedPassword = auth()->user()->password;
        if (Hash::check($passwordRequest->password, $currentHashedPassword)) {
            return response()->json([
                "message" => "success",
                "success" => true
            ], 200);
        } else {
            return response()->json([
                "message" => "failed",
                "success" => false
            ], 401);
        }
    }

    function update_akun_admin(UpdateAdminRequest $updateAdminRequest): JsonResponse
    {
        try {
            $id = Auth::user()->id;
            $akun = User::find($id);
    
            if (!$akun) {
                return response()->json([
                    "message" => "User not found",
                    "success" => false
                ], 404);
            }
    
            $akun->email = $updateAdminRequest->email;
            if(!empty($updateAdminRequest->password)){
                $akun->password = Hash::make($updateAdminRequest->password);
            }
            $akun->username = $updateAdminRequest->username;
            $akun->name = $updateAdminRequest->name;
    
            if ($akun->save()) {
                return response()->json([
                    "message" => "success",
                    "success" => true
                ], 200);
            }
    
            return response()->json([
                "message" => "failed",
                "success" => false
            ], 500);
    
        } catch (\Exception $e) {

            return response()->json([
                "message" => "An error occurred: " . $e->getMessage(),
                "success" => false
            ], 500);
        }
    }

    public function log_out()
    {
        Auth::logout();
        return redirect('/admin/login');
    }
}