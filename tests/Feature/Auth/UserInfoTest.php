<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class UserInfoTest extends TestCase
{
    use DatabaseMigrations, WithFaker;

    /** @test */
    public function user_can_be_retrieved()
    {
        Sanctum::actingAs(
            factory(User::class)->create()
        );

        $response = $this->get('/api/user');

        $response->assertOk();
    }

    /** @test */
    public function user_info_can_be_retrieved()
    {
        $user = factory(User::class)->create();

        factory(UserInfo::class)->create([
            'user_id' => $user->id,
            'email' => $user->email,
        ]);

        Sanctum::actingAs($user);

        $response = $this->get('/api/user-info');

        $response->assertOk()
        ->assertJsonFragment([
            'user_id' => $user->id,
            'email' => $user->email,
        ]);
    }

    /** @test */
    public function user_info_can_be_updated()
    {
        $user = factory(User::class)->create();

        $username = $user->name;

        factory(UserInfo::class)->create([
            'user_id' => $user->id,
            'email' => $user->email,
        ]);

        Sanctum::actingAs($user);

        $response = $this->json('PUT', '/api/update-user-info', [
            'second_name' => $this->faker->lastName(),
            'patronymic' => $this->faker->lastName(),
            'phone' => (string) rand(70000000000, 89999999999),
        ]);

        $response->assertOk()->assertJson(['message' => 'Update completed.']);

        $response = $this->json('PUT', '/api/update-user-info', [
            'name' => $this->faker->userName(),
        ]);

        $response->assertOk()->assertJson(['message' => 'Update completed.']);
        $this->assertNotEquals($username, $user->name);
    }
}
