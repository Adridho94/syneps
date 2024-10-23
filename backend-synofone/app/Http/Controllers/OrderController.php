<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Cart;
use App\Models\Cartitem;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{

    protected $rules = [
        'cart_id' => 'required',
        'alamat' => 'required',
        'metode_pengiriman' => 'required',
        'metode_pembayaran' => 'required',
    ];

    public function orderUser()
    {
        return "oke";
        $user_id = auth()->user()->id;
        $order = Order::where('user_id', $user_id)->get();
        return response()->json([
            'message' => $order->count() > 0 ? 'Data Order Sebagai Berikut' : 'Data Order Belum ada',
            'data' => $order->count() > 0 ? $order : []
        ], 200);
    }

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

    public function show($id)
    {
        $order = Order::with('cart.user')->find($id);
        $totalHargaProduct = 0;
        $totalHarga = 0;
    $cart = Cart::find($order->cart_id);
    $cartItem = Cartitem::where('cart_id', $cart->id)->get();
    foreach ($cartItem as $item) {
        $totalHargaProduct += $item->product->price * $item->qty;
    }
    

        if (is_null($order)) {
            return response()->json([
                'message' => 'Data Order Tidak Ditemukan'
            ], 404);
        }

        return response()->json([
            'message' => 'Data Order Berhasil Ditemukan',
            'data' => $order,
            'totalHargaProduct' => $totalHargaProduct,
        ], 200);
    }

    public function destroy($id)
    {
        $order = Order::find($id);
        if (is_null($order)) {
            return response()->json([
                'message' => 'Data Order Tidak Ditemukan'
            ], 404);
        }
        $order->delete();
        return response()->json([
            'message' => 'Data Order Berhasil di Hapus'
        ], 200);
    }
}
