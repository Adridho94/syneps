<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\User;
use App\Models\Cartitem;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function store(Request $request)
    {
        // return $request;
        $user_id = Auth::user();
        return $user_id;
        $cart = Cart::create([
            'user_id' => $user_id,
        ]);
        $produk_id = $request->produk_id;
        $jumlah = $request->jumlah;
        $cart_id = $cart->id;
        $cart_item = Cartitem::create([
            'cart_id' => $cart_id,
            'produk_id' => $produk_id,
            'jumlah' => $jumlah
        ]);
        return response()->json([
            'message' => 'Cart berhasil ditambahkan',
            'data' => $cart_item
        ], 200);
    }

    public function index()
    {
        $cart = Cart::with('user')->get();

        return response()->json([
            'message' => 'Berhasil menampilkan data cart',
            'data' => $cart
        ], 200);
    }
}
