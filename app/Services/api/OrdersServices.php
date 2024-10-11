<?php

namespace App\Services\api;
use App\Http\Requests\api\v1\master\OrderRequest;
use App\Models\api\v1\master\DetailOrdersModel;
use App\Models\api\v1\master\OrderModel;
use Illuminate\Http\JsonResponse;
use DB;
class OrdersServices
{
    function add_order(OrderRequest $orderRequest): JsonResponse
    {

        $latestOrderId = OrderModel::max('id') + 1;
        $nomorOrder = 'ORD' . date('Ymd') . str_pad($latestOrderId, 4, '0', STR_PAD_LEFT);
        try {
            DB::beginTransaction();
            $order = OrderModel::create(
                [
                    "user_id" => $orderRequest->user_id,
                    "nomor_order" => $nomorOrder,
                    "total" => $orderRequest->total,
                    "status" => $orderRequest->status
                ]
            );
            $detail_orders = [];
            foreach ($orderRequest->detail_orders as $key => $value) {
                $detail_orders[] = [
                    "order_id" => $order->id,
                    "ayam" => $value["ayam"],
                    "jumlah" => $value["jumlah"],
                    "harga" => $value["harga"],
                    "created_at" => now(),
                    "updated_at" => now()
                ];
            }
            DetailOrdersModel::insert($detail_orders);
            DB::commit();
            return response()->json(
                [
                    "message" => "success",
                    "success" => true
                ]
            );
        } catch (\Throwable $th) {
            DB::rollBack();

            return response()->json(
                [
                    "message" => "error in server",
                    "success" => false,
                ]
            );
        }

    }

    function get_order(int $itemPage, int $startPage): JsonResponse
    {
        $order = OrderModel::with("order_details")->paginate($itemPage, ["*"], "page", $startPage);
        return response()->json(
            [
                "message" => "success",
                "success" => true,
                'totalItems' => $order->total(),
                'totalPages' => $order->lastPage(),
                'itemsPerPage' => $itemPage,
                "currentPage" => $order->currentPage(),
                'order' => $order->items(),
            ]
        );
    }
}