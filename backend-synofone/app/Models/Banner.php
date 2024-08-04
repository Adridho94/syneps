<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class Banner extends Model
{
    use HasFactory;


    // ini adalah filed yang tidak boleh di isi
    protected $guarded = ['id'];

    public function getImageAttribute($value)
    {
        return url('uploads/banner/' . $value);
    }
    public function getRealimageAttribute()
    {
        return $this->attributes['image'];
    }
    public function getIdAttribute()
    {
        // jangan lupa  use Illuminate\Support\Facades\Crypt;
        return Crypt::encryptString($this->attributes['id']);
    }
}
