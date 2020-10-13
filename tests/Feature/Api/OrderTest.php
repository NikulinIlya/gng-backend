<?php

namespace Tests\Feature\Api;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class OrderTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function if_user_have_to_be_logged_in()
    {
        $response = $this->json('POST', '/api/orders/create', [
            'cart' => 'abc',
        ]);

        $response->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    }

    /** @test */
    public function test_store_order_request()
    {
        Sanctum::actingAs(
            factory(User::class)->create()
        );

        $response = $this->json('POST', '/api/orders/create', [
            'cart' => '',
        ]);

        $response->assertStatus(400)
            ->assertJson(['Error' => 'Empty cart']);

        factory(Product::class, 3)
            ->create();

        $response = $this->json('POST', '/api/orders/create', [
            'cart' => [
                'order' => [
                    0 => [
                        'id' => 1,
                        'quantity' => 1,
                        'unit' => 'thing',
                    ],
                    1 => [
                        'id' => 2,
                        'quantity' => 1,
                        'unit' => 'thing',
                    ],
                ],
                'promo' => null,
            ],
            'comment' => 'My comment',
        ]);

        $response->assertStatus(201);
    }
}
