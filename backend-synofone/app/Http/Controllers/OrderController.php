<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        return response()->json([
            'message' => $orders->count() > 0 ? 'Data Order Sebagai Berikut' : 'Data Order Belum ada',
            'data' => $orders->count() > 0 ? $orders : []
        ], 200);
    }

    public function store(Request $request)
    {
        $rules = [
            'cart_id' => 'required',
            'alamat' => 'required',
            'metode_pengiriman' => 'required',
            'metode_pembayaran' => 'required',
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 400);
        }
        $order = Order::create($request->all());
        return response()->json([
            'message' => 'Data Order Berhasil di Tambahkan',
            'data' => $order
        ], 201);
    }
}
