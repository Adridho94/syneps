<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public static function index()
    {
        $products = Product::all();
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
        $request->validate(
            [
                'image' => 'required',
                'title' => 'required',
                'spesification' => 'required',
                'price' => 'required',
                'qty' => 'required',
                'warna' => 'required'
            ]
        );

        $product = Product::create(
            [
                'image' => $request->image,
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

        return response()->json(
            [
                'message' => 'Berikut Data Produk',
                'data' => $product
            ],200
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
