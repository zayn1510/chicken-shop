<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\api\v1\master\PasswordRequest;
use App\Http\Requests\api\v1\master\UpdateAdminRequest;
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
        return $this->authService->loginAdmin($authRequest);
    }
    public function authUser(AuthRequest $authRequest): JsonResponse
    {
        return $this->authService->loginUer($authRequest);
    }

    public function checkPassword(PasswordRequest $passwordRequest): JsonResponse
    {
        return $this->authService->check_password($passwordRequest);
    }

    public function updateAkunAdmin(UpdateAdminRequest $updateAdminRequest): JsonResponse
    {
        return $this->authService->update_akun_admin($updateAdminRequest);
    }

    public function logOut()
    {
        return $this->authService->log_out();
    }
}
