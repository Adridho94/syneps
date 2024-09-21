<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public static function index()
    {
        $products = Product::all();
        foreach ($products as $product) {
            $product->price_rupiah = 'Rp ' . number_format($product->price, 0, ',', '.');
        }
        if ($products->isEmpty()) {
            return response()->json(
                [
                    'message' => 'Tidak ada produk yang ditemukan',
                    'data' => []
                ],
                404
            );
        } else {
            return response()->json(
                [
                    'message' => 'Daftar Produk',
                    'data' => $products
                ],
                200
            );
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dataValidate = Validator::make($request->all(), [
            'image' => 'required||mimes:jpg,jpeg,png|max:2048',
            'title' => 'required',
            'spesification' => 'required',
            'price' => 'required',
            'qty' => 'required',
            'warna' => 'required'
        ]);

            $filename ="";

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = "produk".time() . '.' . $file->getClientOriginalExtension();
                $file->move('uploads/products/', $filename);
            }


        $product = Product::create(
            [
                'image' => $filename,
                'title' => $request->title,
                'spesification' => $request->spesification,
                'price' => $request->price,
                'qty' => $request->qty,
                'warna' => $request->warna
            ]
        );
        return response()->json(
            [
                'message' => 'Produk berhasil ditambahkan',
                'data' => $product
            ],
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::find($id);
        $realPrice =$product->real_price;
        return response()->json(
            [
                'message' => 'Berikut Data Produk',
                'data' => $product,
                // 'price'=>$realPrice

            ],
            200
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $dataValidate = Validator::make($request->all(), [
            'image' => 'mimes:jpg,jpeg,png,svg|max:2048',
            'title' => 'required',
            'spesification' => 'required',
            'price' => 'required',
            'qty' => 'required',
            'warna' => 'required'
        ]);

        if ($dataValidate->fails()) {
            return response()->json(
                [
                    'message' => 'Data tidak valid',
                    'data' => $dataValidate->errors()
                ],
                400
            );
        }

        $product = Product::find($id);
        $filename=$product->real_image;
        
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = "produk".time() . '.' . $file->getClientOriginalExtension();
            $file->move('uploads/products/', $filename);
            $path = public_path('uploads/products/') . $product->real_image;
            if (file_exists($path))
            {
                unlink($path);
            }
        }

        $product->update(
            [
                'image' => $filename,
                'title' => $request->title,
                'spesification' => $request->spesification,
                'price' => $request->price,
                'qty' => $request->qty,
                'warna' => $request->warna
            ]
        );

        return response()->json(
            [
                'message' => 'Produk berhasil diupdate',
                'data' => $product
            ],
            200
        );


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);
        if ($product) {
            $path = public_path('uploads/products/') . $product->real_image;
            if (file_exists($path)) {
                unlink($path);
            }
            $product->delete();
            return response()->json(
                [
                    'message' => 'Produk berhasil dihapus',
                    'data' => $product
                ],
                200
            );
        } else {
            return response()->json(
                [
                    'message' => 'Produk tidak ditemukan',
                    'data' => null
                ],
                404
            );
        }
    }
}
