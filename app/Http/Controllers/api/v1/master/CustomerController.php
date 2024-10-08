<?php

namespace App\Http\Controllers\api\v1\master;

use App\Http\Controllers\Controller;
use App\Http\Requests\api\v1\master\CustomersRequest;
use App\Services\api\CustomersServices;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    protected CustomersServices $customersServices;

    public function __construct(CustomersServices $customersServices)
    {
        $this->customersServices=$customersServices;
    }

    public function Customers(int $itemPage,int $startPage):JsonResponse
    {
        return $this->customersServices->get_customers($itemPage,$startPage);
    }
    public function createUser(CustomersRequest $customersRequest):JsonResponse
    {
        return $this->customersServices->create_user($customersRequest);
    }

    public function deleteCustomers(int $id):JsonResponse
    {
        return $this->customersServices->delete_customers($id);
    }
}
