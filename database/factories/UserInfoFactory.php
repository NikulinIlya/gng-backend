<?php

namespace Database\Factories;

use App\Models\UserInfo;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserInfoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = UserInfo::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $genders = ['male', 'female'];

        return [
            'email'           => null,
            'second_name'     => $this->faker->lastName,
            'patronymic'      => $this->faker->lastName,
            'phone'           => (string)rand(70000000000, 89999999999),
            'gender'          => $genders[array_rand($genders, 1)],
            'birthday'        => $this->faker->date(),
            'discount_agreed' => rand(0, 1),
            'events_agreed'   => rand(0, 1),
        ];
    }
}
