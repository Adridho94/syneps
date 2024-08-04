<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartitemController;
use App\Http\Controllers\OrderController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/banner', 'BannerController@index');

Route::get('/banners',[BannerController::class,'index']);
Route::post('/banner',[BannerController::class,'store']);
Route::post('/banner/{id}',[BannerController::class,'update']);
Route::get('/banner/{id}',[BannerController::class,'show']);
Route::delete('/banner/{id}',[BannerController::class,'destroy']);


// method pengambilan data keseluruhan dari database
Route::get('/products',[ProductController::class,'index' ]);
Route::post('/product',[ProductController::class,'store']);
Route::post('/product/{id}',[ProductController::class,'update']);
Route::delete('/product/{id}',[ProductController::class,'destroy']);
Route::get('/product/{id}',[ProductController::class,'show']);


Route::get('/users',[UserController::class,'index']);
Route::post('/user',[UserController::class,'store']);
Route::get('/user/{id}',[UserController::class,'show']);
Route::post('/user/{id}',[UserController::class,'update']);
Route::delete('/user/{id}',[UserController::class,'destroy']);


Route::post('/cart',[CartController::class,'store']);
Route::get('/carts',[CartController::class,'index']);

Route::get('/cartitem',[CartitemController::class,'index']);
Route::post('/cartitem',[CartitemController::class,'store']);

// mencari data item di keranjang sesuai dengan id user
Route::get('/user-cart/{id}',[CartitemController::class,'userCart']);

Route::get('/orders',[OrderController::class,'index']);
Route::post('/order',[OrderController::class,'store']);
Route::get('/order/{id}',[OrderController::class,'show']);
Route::delete('/order/{id}',[OrderController::class,'destroy']);