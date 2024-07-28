<?php

namespace App\Http\Controllers;

use App\Models\Cartitem;
use Illuminate\Http\Request;
use App\Models\Cart;

class CartitemController extends Controller
{
    public function index()
    {
        $cartitem = Cartitem::with('product')->get();
        return response()->json([
            'message' => 'Berhasil menampilkan data cartitem',
            'data' => $cartitem
        ], 200);
    }

    public function store(Request $request)
    {
        $cartitem = Cartitem::create([
            'cart_id' => $request->cart_id,
            'product_id' => $request->product_id,
            'qty' => $request->qty
        ]);

        return response()->json([
            'message' => 'Berhasil menambahkan data cartitem',
            'data' => $cartitem
        ], 200);
    }

    public function userCart($id)
    {
        $cart = Cart::where('user_id', $id)->first();
        $cart_id = $cart->id;
        $cartItem = Cartitem::where('cart_id', $cart_id)->get();
        if ($cartItem->count() > 0) {
            return response()->json([
                'message' => 'Berhasil menampilkan data cartitem',
                'data' => $cartItem
            ], 200);
        } else {
            return response()->json([
                'message' => 'Data cartitem tidak ditemukan',
                'data' => null
            ], 404);
        }
    }
}
