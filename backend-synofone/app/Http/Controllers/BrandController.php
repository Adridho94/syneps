<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brand;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brands = Brand::all();
        if ($brands->count() > 0) {
            return response()->json([
                'message' => 'Berhasil menampilkan data brand',
                'data' => $brands
            ], 200);
        } else {
            return response()->json([
                'message' => 'Data brand tidak ditemukan',
                'data' => null
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'gambar' => 'required',
            'keterangan' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 400);
        }

        $fileName = "";
        if($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $fileName ='brand'. time().".".$file->getClientOriginalExtension();
            $file->move(public_path('images'), $fileName);
        }else{
            return response()->json([
                'message' => 'Gambar harus berupa file',
                'data' => null
            ], 404);
        }

        $brand = Brand::create([
            'title' => $request->title,
            'gambar' => $fileName,
            'keterangan' => $request->keterangan
        ]);

        return response()->json([
            'message' => 'Berhasil menambahkan brand',
            'data' => $brand
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $brand = Brand::find($id);
        if ($brand) {
            return response()->json([
                'message' => 'Berhasil menampilkan data brand',
                'data' => $brand,
                'gambar_asli' => $brand->real_gambar
            ], 200);
        } else {
            return response()->json([
                'message' => 'Data brand tidak ditemukan',
                'data' => null
            ], 404);
        }
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
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'gambar' => 'required||image||mimes:jpeg,png,jpg,gif,svg|max:2048',
            'keterangan' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 400);
        }

        $brand = Brand::find($id);

        if ($brand) {
            $fileName = "";
            if($request->hasFile('gambar')) {
                $file = $request->file('gambar');
                $fileName ='brand'. time().".".$file->getClientOriginalExtension();
                $file->move(public_path('images'), $fileName);
                $path = public_path('images/').$brand->real_gambar;
                if(file_exists($path)){
                    unlink($path);
                }
            }else{
                return response()->json([
                    'message' => 'Gambar harus berupa file',
                    'data' => null
                ], 404);
            }

            $brand->update([
                'title' => $request->title,
                'gambar' => $fileName,
                'keterangan' => $request->keterangan
            ]);

            return response()->json([
                'message' => 'Berhasil mengubah data brand',
                'data' => $brand
            ], 200);
        } else {
            return response()->json([
                'message' => 'Data brand tidak ditemukan',
                'data' => null
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $brand = Brand::find($id);
        if ($brand) {
            $path = public_path('images/').$brand->real_gambar;
            if(file_exists($path
            )){
                unlink($path);
            }
            $brand->delete();
            return response()->json([
                'message' => 'Berhasil menghapus data brand',
                'data' => $brand
            ], 200);
        } else {
            return response()->json([
                'message' => 'Data brand tidak ditemukan',
                'data' => null
            ], 404);
        }
    }
}
