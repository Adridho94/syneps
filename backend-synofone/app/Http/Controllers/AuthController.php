<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // return $request;
        $validator = Validator::make(
            $request->all(),
            [
                'email'    =>  'required|email',
                'password' =>  'required'
            ],
            [
                'email.required'    =>  'Silahkan masukkan email anda !',
                'email.email'       =>  'Maaf, email yang anda masukkan tidak benar !',
                'password'          =>  'Silahkan masukkan password anda !'
            ]
        );

        if($validator->fails())
        {
            return response()->json($validator->errors(), 422);
        }

        $user = User::where('email', $request->email)->first();
        // return $user;

        if(!$user || !Hash::check($request->password, $user->password))
        {
            return response()->json([
                'message' => 'Login GAGAL !',
                'data' => false
            ], 400);
        }

        return response()->json([
            'message'    =>    'Berhasil login !',
            'data'       =>    $user,
            'token_type' =>    'Bearer',
            'token'      =>    $user->createToken('authToken')->plainTextToken  
        ], 200);
    }
}
