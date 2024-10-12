<?php

namespace App\Http\Controllers\api\v1\master;

use App\Http\Controllers\Controller;
use App\Http\Requests\api\v1\master\BankRequest;
use App\Services\api\BankServices;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BankController extends Controller
{
    protected BankServices $bankServices;

    function __construct(BankServices $bankServices)
    {
        $this->bankServices = $bankServices;
    }

    function getBank(int $itemPage, int $startPage): JsonResponse
    {
        return $this->bankServices->get_data($itemPage, $startPage);
    }

    function addBank(BankRequest $bankRequest): JsonResponse
    {
        return $this->bankServices->add_data($bankRequest);
    }

    function updateBank(BankRequest $bankRequest, int $id): JsonResponse
    {
        return $this->bankServices->update_data($bankRequest, $id);
    }

    function deleteBank(int $id): JsonResponse
    {
        return $this->bankServices->delete_data($id);
    }
    function detailBank(int $id): JsonResponse
    {
        return $this->bankServices->detail_data($id);
    }
}
