<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use App\Models\Cartitem;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function store(Request $request)
    {
        $user_id = Auth::user()->id;
        $produk_id = $request->product_id;
        $produk = Product::find($produk_id);
        // return $produk;
        $produk->qty = $produk->qty - $request->qty;
        $produk->save();
        
        $cart = Cart::create([
            'user_id' => $user_id,
        ]);

        $jumlah = $request->qty;
        $cart_item = Cartitem::create([
            'cart_id' => $cart->id,
            'product_id' => $produk_id,
            'qty' => $jumlah
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
