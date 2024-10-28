<?php

namespace App\Services\api;
use App\Http\Requests\api\v1\master\OrderRequest;
use App\Models\api\v1\master\DetailOrdersModel;
use App\Models\api\v1\master\JenisAyamModels;
use App\Models\api\v1\master\OrderModel;
use App\Models\api\v1\master\StokModels;
use App\Models\api\v1\master\TransaksiPembayaran;
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
            $stok_keluar = [];
            foreach ($orderRequest->detail_orders as $key => $value) {
                $detail_orders[] = [
                    "order_id" => $order->id,
                    "ayam" => $value["ayam"],
                    "jumlah" => $value["jumlah"],
                    "harga" => $value["harga"],
                    "created_at" => now(),
                    "updated_at" => now()
                ];
                $stok_keluar[] = [
                    "jenis_ayam" => $value["ayam"],
                    "jumlah" => $value["jumlah"],
                    "tanggal_masuk" => now(),
                    "jenis_stok" => 2,
                    "created_at" => now(),
                    "updated_at" => now()
                ];

                JenisAyamModels::where("id", $value["ayam"])->decrement('stok', $value["jumlah"]);

            }
            StokModels::insert($stok_keluar);
            DetailOrdersModel::insert($detail_orders);
            $transaksi = TransaksiPembayaran::create([
                "order_id" => $order->id,
                "bank_id" => $orderRequest->bank,
                "metode_id" => $orderRequest->metode,
                "total" => $orderRequest->total,
                "status" => 1
            ]);

            DB::commit();
            return response()->json(
                [
                    "message" => "success",
                    "success" => true,
                    "nomor" => $nomorOrder . "" . $transaksi->id,
                    "digit"=>strlen($transaksi->id)
                ]
            );
        } catch (\Throwable $th) {
            DB::rollBack();

            return response()->json(
                [
                    "message" => "error in server ".$th->getMessage(),
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