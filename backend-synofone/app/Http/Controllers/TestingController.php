<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestingController extends Controller
{
    public function index()
    {
        $data = "Hello World!";
        return view('testing', compact('data'));
    }
}
