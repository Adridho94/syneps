<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Providers\BrandPhoneProvider;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $this->faker->addProvider(new BrandPhoneProvider($this->faker));
        return [
            'image' => $this->faker->image('public/uploads', 640, 480, null, false),
            'title' => $this->faker->brandPhone,
            'spesification' => $this->faker->sentence,
            'price' => $this->faker->numberBetween(10000, 100000),
            'qty' => $this->faker->numberBetween(1, 100),
            'warna' => $this->faker->safeColorName,
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
