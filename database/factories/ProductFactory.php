<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

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
        $price = $this->faker->numberBetween(1000, 5000);

        return [
            'name'                => $this->faker->sentence,
            'slug'                => $this->faker->slug,
            'price'               => $price,
            'case_price'          => $price * 6,
            'vendor_code'         => $this->faker->numberBetween(1000000, 9000000),
            'image'               => $this->faker->imageUrl(),
            'glass_image'         => $this->faker->imageUrl(),
            'brand_id'            => 1,
            'product_category_id' => ProductCategory::factory(),
        ];
    }
}

