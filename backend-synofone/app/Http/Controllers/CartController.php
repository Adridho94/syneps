<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\User;

class CartController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
        ]);
        $cart = Cart::create([
            'user_id' => $request->user_id,
        ]);
        return response()->json([
            'message' => 'Cart berhasil ditambahkan',
            'data' => $cart
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
