<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\UserInfo;
use Faker\Generator as Faker;

$factory->define(UserInfo::class, function (Faker $faker) {
    $genders = ['male', 'female'];

    return [
        'email' => null,
        'second_name' => $faker->lastName,
        'patronymic' => $faker->lastName,
        'phone' => (string) rand(70000000000, 89999999999),
        'gender' => $genders[array_rand($genders, 1)],
        'birthday' => $faker->date(),
        'discount_agreed' => rand(0, 1),
        'events_agreed' => rand(0, 1),
    ];
});
