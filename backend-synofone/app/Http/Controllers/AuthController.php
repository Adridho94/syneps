<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validasi input dari request
        $validator = Validator::make(
            $request->all(),
            [
                'email'    => 'required|email',
                'password' => 'required'
            ],
            [
                'email.required'    => 'Silahkan masukkan email anda !',
                'email.email'       => 'Maaf, email yang anda masukkan tidak benar !',
                'password.required' => 'Silahkan masukkan password anda !'
            ]
        );
    
        // Jika validasi gagal, kembalikan pesan error
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        // Cari user berdasarkan email
        $user = User::where('email', $request->email)->first();
    
        // Jika user tidak ditemukan atau password salah
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Login GAGAL!',
                'data'    => false
            ], 400);
        }
    
        // Buat token untuk user
        $token = $user->createToken('authToken')->plainTextToken;
    
        // Kembalikan respon berhasil login beserta tokennya
        return response()->json([
            'message'    => 'Berhasil login!',
            'data'       => $user,
            'token_type' => 'Bearer',
            'role'       => $user->role, // Pastikan field role ada pada tabel users
            'token'      => $token
        ], 200);
    }
    

    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json([
            'message' => 'Berhasil logout !'
        ], 200);
    }
}
