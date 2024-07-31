<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function index()
    {

        $ordes = Order::all();
        return response()->json(
            [
                'status' => 'success',
                'message' => 'Berikut Data Order Seluruh Pelanggan',
                'data' => $ordes
            ],
            200
        );
    }

    public function store(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'cart_id' => 'required',
            'alamat' => 'required',
            'metode_pengiriman' => 'required',
            'metode_pembayaran' => 'required'
        ]);
        if ($validateData->fails()) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Data Order Gagal Ditambahkan',
                    'data' => $validateData->errors()
                ],
                201
            );
        } else {
            $order = Order::create($request->all());
            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'Data Order Berhasil Ditambahkan',
                    'data' => $order
                ],
                201
            );
        }
    }
}
