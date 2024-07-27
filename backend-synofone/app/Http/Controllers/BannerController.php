<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Banner;

class BannerController extends Controller
{
    public function index()
    {
        // return "testing";a
        $banner = Banner::all();
        // return $banner;

        return response()->json([
            'message' => 'Berhasil menampilkan data banner',
            'data' => $banner
        ], 200);
    }

    public function store(Request $request)
    {

        $request->validate([
            'image' => 'required',
            'keterangan' => 'required'
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            // $filePath = 'lo'
            $file->move('uploads/banner/', $filename);
            // $request->image = $filename;
        }
        
        $banner = new Banner;
        $banner->image = $filename;
        $banner->keterangan = $request->keterangan;
        $banner->save();

        return response()->json([
            'message' => 'Banner berhasil ditambahkan',
            'data' => $banner
        ], 200);
    }

    public function update(Request $request, string $id){
        // memvalidasi data yang dikirim
        $request -> validate([
            'image' => 'required',
            'keterangan' => 'required'
        ]);
        // mencari data banner berdasarkan id dan di tampung ke dalam variabel $banner
        $banner = Banner::find($id);
        // proses memasukan data baru ke dalam variabel $banner
        $banner->image = $request->image;
        $banner->keterangan = $request->keterangan;
        $banner->save();
        // memberikan response berhasil dan mengembalikan ke client 
        return response()->json([
            'message' => 'Banner berhasil diupdate',
            'data' => $banner
        ], 200);
    }

    public function destroy(string $id)
    {
        // mencari data banner berdasarkan id dan di tampung ke dalam variabel $banner
        $banner = Banner::find($id);

        // proses menghapus data banner
        $banner->delete();

        // memberikan response berhasil dan mengembalikan ke client 
        return response()->json([
            'message' => 'Banner berhasil dihapus',
        ], 200);
    }
}
