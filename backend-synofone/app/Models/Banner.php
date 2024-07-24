<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    // ini adalah filed yang boleh di isi
    // protected $fillable = [
    //     'image',
    //     'keterangan'
    // ];

    // ini adalah filed yang tidak boleh di isi
    protected $guarded = ['id'];

    public function getImageAttribute($value)
    {
        return url('uploads/banner/' . $value);
    }
}
