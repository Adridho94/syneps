<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        if ($users->isEmpty()) {
            return response()->json([
                'status' => 'Data User Kosong'
            ], 404);
        }
        return response()->json([
            'status' => 'Berikut Data User',
            'data' => $users
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        return response()->json([
            'status' => 'Data User Berhasil Ditambahkan',
            'data' => $user
        ], 200);
    }

    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 'Data User Tidak Ditemukan'
            ], 404);
        }
        return response()->json([
            'status' => 'Berikut Data User',
            'data' => $user
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'required',
            'password_confirmation' => 'required'
        ]);
        if ($request->password != $request->password_confirmation) {
            return response()->json([
                'status' => 'Password Tidak Sama'
            ], 400);
        }
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 'Data User Tidak Ditemukan'
            ], 404);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json([
            'status' => 'Data User Berhasil Diubah',
            'data' => $user
        ], 200);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 'Data User Tidak Ditemukan'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'status' => 'Data User Berhasil Dihapus',
            'data' => $user
        ], 200);
    }
}
