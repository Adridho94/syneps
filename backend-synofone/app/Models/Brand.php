<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function getGambarAttribute($value)
    {
        return url('images/' . $value);
    }

    public function getRealGambarAttribute()
    {
        return $this->attributes['gambar'];
    }
}
