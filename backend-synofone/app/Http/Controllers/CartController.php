<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use App\Models\Cartitem;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function checkCart(){
        $user_id = Auth::user()->id;
        $cart = Cart::where('user_id', $user_id)->where('status', 1)->get();
        if ($cart->count() > 0) {
            return response()->json([
                'message' => 'Cart sudah ada',
                'data' => $cart
            ], 200);
        } else {
            return response()->json([
                'message' => 'Cart belum ada',
                'data' => $cart
            ], 200);
        }
    }

    public function store(Request $request)
    {
        $user_id = Auth::user()->id;
        $produk_id = $request->product_id;
        $produk = Product::find($produk_id);
        // return $produk;
        $produk->qty = $produk->qty - $request->qty;
        $produk->save();

        $cart = Cart::where('user_id', $user_id)->where('status', 0)->first();
        // return $cart;
        if ($cart) {
            $cart_item = Cartitem::where('cart_id', $cart->id)->where('product_id', $produk_id)->first();
            // return $cart_item;
            if ($cart_item !== null) {
                $cart_item->qty = $cart_item->qty + $request->qty;
                $cart_item->save();
                return response()->json([
                    'message' => 'Cart berhasil ditambahkan',
                    'data' => $cart_item
                ], 200);
            }
            else{
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
        } else {
            return "tidak";
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
