<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
class CartController extends Controller
{
    public function store (Request $request){
        $request->validate([
            'user_id'=>'required',
        ]);
        $cart = Cart::create([
            'user_id'=>$request->user_id,
        ]);
        return response()->json([
            'message'=>'Cart berhasil ditambahkan',
            'data'=>$cart
        ], 200);
    }
}
