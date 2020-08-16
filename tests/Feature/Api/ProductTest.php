<?php

namespace Tests\Feature\Api;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use DatabaseMigrations;

    protected $count = 3;

    protected function setUp(): void
    {
        parent::setUp();

        $this->createProductCategoriesWithProducts();
    }

    protected function createProductCategoriesWithProducts()
    {
        $productCategories = factory(ProductCategory::class, $this->count)
            ->create()
            ->each(function ($productCategory) {
                $productCategory->products()->save(factory(Product::class)->make());
            });
    }

    /** @test */
    public function if_database_has_exact_number_of_products()
    {
        $this->assertDatabaseCount('products', $this->count);
    }

    /** @test */
    public function receiving_exact_number_of_products()
    {
        $response = $this->get('/api/products');

        $response->assertOk()->assertJsonCount($this->count);
    }

    /** @test */
    public function receiving_exact_product_by_its_id()
    {
        $productExistsId = 3;

        $response = $this->get('/api/products/'.$productExistsId);

        $response->assertOk()->assertJsonCount(1);

        $productNotExistsId = 4;

        $response = $this->get('/api/products/'.$productNotExistsId);

        $response->assertNotFound();
    }
}
