<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\Auth\AuthService;

class AuthController extends Controller
{

    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }
    public function login(AuthRequest $authRequest)
    {
        return $this->authService->login($authRequest);
    }
    public function authUser(AuthRequest $authRequest): JsonResponse
    {
        return $this->authService->loginUer($authRequest);
    }
}
