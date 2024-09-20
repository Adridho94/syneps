<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected $guarded = ['id'];
    
    // protected $fillable = ['image', 'title', 'spesification', 'price', 'qty', 'warna'];

    use HasFactory;

    public function getImageAttribute($value)
    {
        return url('uploads/products/' . $value);
    }
    public function getRealImageAttribute()
    {
        return $this->attributes['image'];
    }
}
