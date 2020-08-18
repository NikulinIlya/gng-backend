<?php

namespace Tests\Feature\Api;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class CartTest extends TestCase
{
    use DatabaseMigrations;

    protected $count = 3;

    protected function setUp(): void
    {
        parent::setUp();

        $this->createProductCategoriesWithProducts();
    }

    protected function createProductCategoriesWithProducts($count = null)
    {
        $count = $count ?? $this->count;

        $productCategories = factory(ProductCategory::class, $count)
            ->create()
            ->each(
                function ($productCategory) {
                    $productCategory->products()->save(factory(Product::class)->make());
                }
            );
    }

    /** @test */
    public function will_fail_with_validate_errors_when_send_wrong_request_data()
    {
        $response = $this->json(
            'POST',
            '/api/cart',
            []
        );

        $response->assertNotFound()->assertJson(
            [
                'message' => 'The given data was invalid.',
                'errors' => [
                    'id' => [
                        'The id field is required.',
                    ],
                    'name' => [
                        'The name field is required.',
                    ],
                    'quantity' => [
                        'The quantity field is required.',
                    ],
                    'price' => [
                        'The price field is required.',
                    ],
                    'type' => [
                        'The type field is required.',
                    ],
                ],
            ]
        );

        $response = $this->json(
            'POST',
            '/api/cart',
            [
                'id' => 'ABC',
                'name' => 123456,
                'quantity' => 1.5,
                'price' => 1000.87,
                'type' => 'multi',
            ]
        );

        $response->assertNotFound()->assertJson(
            [
                'message' => 'The given data was invalid.',
                'errors' => [
                    'id' => [
                        'The id field must be an integer.',
                    ],
                    'name' => [
                        'The name field must be a string.',
                    ],
                    'quantity' => [
                        'The quantity field must be an integer.',
                    ],
                    'price' => [
                        'The price field must be an integer.',
                    ],
                    'type' => [
                        'The selected type is invalid.',
                    ],
                ],
            ]
        );
    }

    /** @test */
    public function can_store_items_in_cart()
    {
        $product = Product::first();

        $response = $this->post(
            '/api/cart',
            [
                'id' => $product->id,
                'name' => $product->name,
                'quantity' => 1,
                'price' => $product->price,
                'type' => 'single',
            ]
        );

        $response->assertOk();
    }

    /** @test */
    public function will_receive_cart_items()
    {
        $response = $this->get('/api/cart/');

        $response->assertOk()->assertJson([]);
    }
}
