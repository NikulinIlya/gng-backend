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

    protected function createProductCategories(int $count)
    {
        $productCategories = factory(ProductCategory::class, $count)
            ->create();
    }

    /** @test */
    public function if_database_has_exact_number_of_product_categories()
    {
        $count = 3;

        $this->createProductCategories($count);

        $this->assertDatabaseCount('product_categories', $count);
    }

    /** @test */
    public function receiving_exact_number_of_product_categories()
    {
        $count = 3;

        $this->createProductCategories($count);

        $this->assertDatabaseCount('product_categories', $count);

        $response = $this->get('/api/product-categories');

        $response->assertOk()->assertJsonCount($count);
    }

    /** @test */
    public function receiving_exact_product_category_by_its_id()
    {
        $count = 3;

        $this->createProductCategories($count);

        $productCategoryExistsId = 1;

        $response = $this->get('/api/product-categories/'.$productCategoryExistsId);

        $response->assertOk()->assertJsonCount(1);

        $productCategoryNotExistsId = 4;

        $response = $this->get('/api/product-categories/'.$productCategoryNotExistsId);

        $response->assertNotFound();
    }
}
