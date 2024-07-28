<?php

namespace App\Http\Controllers;
use App\Models\Cartitem;
use Illuminate\Http\Request;

class CartitemController extends Controller
{
    public function index(){
        $cartitem = Cartitem::with('product')->get();
        return response()->json([
            'message' => 'Berhasil menampilkan data cartitem',
            'data' => $cartitem
        ], 200);
    }

    public function store(Request $request){
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
}
