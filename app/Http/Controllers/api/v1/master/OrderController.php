<?php

namespace App\Http\Controllers\api\v1\master;

use App\Http\Controllers\Controller;
use App\Http\Requests\api\v1\master\OrderRequest;
use App\Services\api\OrdersServices;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected OrdersServices $order;
    function __construct(OrdersServices $ordersServices)
    {
        $this->order = $ordersServices;
    }

    function orderAyam(OrderRequest $orderRequest): JsonResponse
    {
        return $this->order->add_order($orderRequest);
    }

    function getOrder(int $itemPage, int $startPage): JsonResponse
    {
        return $this->order->get_order($itemPage, $startPage);
    }

}
