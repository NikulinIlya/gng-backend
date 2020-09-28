<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\ProductCategory;
use Faker\Generator as Faker;

$factory->define(ProductCategory::class, function (Faker $faker) {
    return [
        'name' => $faker->sentence,
        'slug' => $faker->slug,
        'is_strong_drink' => rand(0, 1),
    ];
});
