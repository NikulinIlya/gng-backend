<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        static $password;

        return [
            'name'              => $this->faker->name,
            'email'             => $this->faker->unique()->freeEmail,
            'email_verified_at' => now(),
            'password'          => $password ?: $password = bcrypt('secret'),
            'remember_token'    => Str::random(10),
        ];
    }

    /**
     * Define the model's unverified state.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}

