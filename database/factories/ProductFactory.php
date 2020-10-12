<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    $price = $faker->numberBetween(1000, 5000);

    return [
        'name' => $faker->sentence,
        'slug' => $faker->slug,
        'price' => $price,
        'case_price' => $price * 6,
        'vendor_code' => $faker->numberBetween(1000000, 9000000),
        'image' => $faker->imageUrl(),
        'glass_image' => $faker->imageUrl(),
        'brand_id' => 1,
        'product_category_id' => factory(App\Models\ProductCategory::class),
    ];
});
