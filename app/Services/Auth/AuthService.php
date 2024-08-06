<?php
namespace App\Services\Auth;

use App\Http\Requests\AuthRequest;
use Illuminate\Http\JsonResponse;
use Auth;

class AuthService
{
    function login(AuthRequest $authRequest): JsonResponse
    {
        $credentials = $authRequest->validated();
        if (Auth::attempt($credentials)) {
            return response()->json(
                [
                "message" => "success",
                "status" => true,
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
}