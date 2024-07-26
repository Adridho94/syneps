<?php

namespace App\Providers;

use Faker\Provider\Base;

class BrandPhoneProvider extends Base
{
    protected static $brands = [
        'Samsung', 'Apple', 'Huawei', 'Xiaomi', 'Oppo', 'Vivo', 'Realme', 'OnePlus', 'Sony', 'Nokia'
    ];

    public function brandPhone()
    {
        return static::randomElement(static::$brands);
    }
}
