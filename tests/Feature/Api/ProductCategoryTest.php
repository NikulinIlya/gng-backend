<?php

namespace Tests\Feature\Api;

use App\Models\ProductCategory;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductCategoryTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function receiving_product_categories()
    {
        $productCategories = factory(ProductCategory::class, 3)->make();

        $response = $this->get('/api/product-categories');

        $response->assertStatus(200);
    }
}
