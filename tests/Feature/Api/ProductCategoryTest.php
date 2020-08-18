<?php

namespace Tests\Feature\Api;

use App\Models\ProductCategory;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class ProductCategoryTest extends TestCase
{
    use DatabaseMigrations;

    protected $count = 3;

    protected function setUp(): void
    {
        parent::setUp();

        $this->createProductCategories();
    }

    protected function createProductCategories()
    {
        $productCategories = factory(ProductCategory::class, $this->count)
            ->create();
    }

    /** @test */
    public function if_database_has_exact_number_of_product_categories()
    {
        $this->assertDatabaseCount('product_categories', $this->count);
    }

    /** @test */
    public function receiving_exact_number_of_product_categories()
    {
        $response = $this->get('/api/product-categories');

        $response->assertOk()->assertJsonCount($this->count);
    }

    /** @test */
    public function receiving_exact_product_category_by_its_id()
    {
        $productCategoryExistsId = 1;

        $response = $this->get('/api/product-categories/'.$productCategoryExistsId);

        $response->assertOk()->assertJsonCount(1);

        $productCategoryNotExistsId = 4;

        $response = $this->get('/api/product-categories/'.$productCategoryNotExistsId);

        $response->assertNotFound();
    }
}
