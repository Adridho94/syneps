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

    public function uploadPembayaran(Request $request, $id)

    {

        // return $request;
        $order = Order::find($id);
        if (is_null($order)) {
            return response()->json([
                'message' => 'Data Order Tidak Ditemukan'
            ], 404);
        }
        $rules = [
            'bukti_pembayaran' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 400);
        }
        $file = $request->file('bukti_pembayaran');
        $fileName = time() . '.' . $file->getClientOriginalExtension();
        $file->move('uploads/bukti_pembayaran', $fileName);
        $order->image = $fileName;
        $order->status_pembayaran = 1;
        $order->save();
        $cart = Cart::find($order->cart_id);
        $cart->status = 3;
        $cart->save();
        return response()->json([
            'message' => 'Bukti Pembayaran Berhasil di Upload',
            'data' => $order
        ], 200);
    }

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
            'total_pembayaran' => 'required',
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 400);
        }
        $updateCartStatus = Cart::find($request->cart_id);
        $updateCartStatus->status = 2;
        $updateCartStatus->save();
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

    public function orderStatus($id){
        $order = Order::where('cart_id', $id)->get();
        return response()->json([
            'message' => 'Data Order Berhasil Ditemukan',
            'data' => $order
        ], 200);
    }
}
