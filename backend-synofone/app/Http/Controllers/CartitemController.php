<?php

namespace App\Http\Controllers;

use App\Models\Cartitem;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class CartitemController extends Controller
{

    public function cartItem()
    {
        // return "oke";
        $user_id = auth()->user()->id;
        // return $user_id;
        $cart = Cart::where('user_id', $user_id)->where('status', 0)->get();
        if ($cart->count() > 0) {
            $cart_id = $cart[0]->id;
            $produkItem = Cartitem::where('cart_id', $cart_id)->with('product')->get();
        } else {
            $produkItem = [];
        }


        return response()->json([
            'message' => 'Berhasil menampilkan data cartitem',
            'data' => $produkItem
        ], 200);
    }
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

        $request->validate([
            'cart_id' => 'required',
            'product_id' => 'required',
            'qty' => 'required'
        ]);

        $findCart = Cartitem::where('cart_id', $request->cart_id)->where('product_id', $request->product_id)->first();
        if ($findCart) {
            $findCart->qty = $findCart->qty + $request->qty;
            $findCart->save();
            return response()->json([
                'message' => 'Berhasil menambahkan data cartitem',
                'data' => $findCart
            ], 200);
        } else {
            $cartitem = Cartitem::create([
                'cart_id' => $request->cart_id,
                'product_id' => $request->product_id,
                'qty' => $request->qty
            ]);
        }
        return response()->json([
            'message' => 'Berhasil menambahkan data cartitem',
            'data' => $cartitem
        ], 200);
    }

    public function update(Request $request)
    {
        // Validasi data yang diterima dari frontend
        $validatedData = $request->validate([
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',  // Memastikan product_id ada di tabel products
            'items.*.qty' => 'required|integer|min:1',              // Memastikan qty adalah integer dan minimal 1
        ]);

        // Iterasi setiap item yang dikirimkan
        foreach ($validatedData['items'] as $item) {
            // Cari item di cart berdasarkan product_id
            $cartItem = CartItem::where('product_id', $item['product_id'])->first();

            if ($cartItem) {
                // Hitung selisih perubahan qty
                $qtyDifference = $item['qty'] - $cartItem->qty;

                // Update quantity item di cart
                $cartItem->qty = $item['qty'];
                $cartItem->save();

                // Kurangi atau tambah stok produk berdasarkan selisih qty
                $product = Product::find($item['product_id']);
                if ($product) {
                    // Kurangi stok jika qty bertambah, atau tambahkan stok jika qty berkurang
                    $product->qty -= $qtyDifference;
                    $product->save();
                }
            }
        }
        $updateOrder = Cart::where('user_id', auth()->user()->id)->where('status', 0)->first();
        $updateOrder->status = 1;
        $updateOrder->save();
        return response()->json([
            'success' => true,
            'message' => 'Cart items and product stock updated successfully',
        ]);
    }

    public function destroy($id)
    {
        $cartitem = Cartitem::find($id);
        if ($cartitem) {
            $cartitem->delete();
            $produk = Product::find($cartitem->product_id);
            $produk->qty = $produk->qty + $cartitem->qty;
            $produk->save();

            return response()->json([
                'message' => 'Berhasil menghapus data cartitem',
                'data' => $cartitem
            ], 200);
        } else {
            return response()->json([
                'message' => 'Data tidak ditemukan',
                'data' => null
            ], 404);
        }
    }


    public function userCart($id)
    {

        // mencari data cart berdasarkan id user
        $cart = Cart::where('user_id', $id)->first();
        $cart_id = $cart->id;
        // mencari data cartitem berdasarkan id cart
        $cartItem = Cartitem::where('cart_id', $cart_id)->get();

        // data di hitung,jika data lebih dari 0 maka kembalikan response
        if ($cartItem->count() > 0) {
            return response()->json([
                'message' => 'Berhasil menampilkan data cartitem',
                'data' => $cartItem
            ], 200);
        }
        // jika data tidak ditemukan maka kembalikan response
        else {
            return response()->json([
                'message' => 'Data cartitem tidak ditemukan',
                'data' => null
            ], 404);
        }
    }
}
