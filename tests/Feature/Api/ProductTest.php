<?php

namespace Tests\Feature\Api;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use DatabaseMigrations;

    protected function createProductCategoriesWithProducts(int $count)
    {
        $productCategories = factory(ProductCategory::class, $count)
            ->create()
            ->each(function ($productCategory) {
                $productCategory->products()->save(factory(Product::class)->make());
            });
    }

    /** @test */
    public function if_database_has_exact_number_of_products()
    {
        $count = 3;

        $this->createProductCategoriesWithProducts($count);

        $this->assertDatabaseCount('products', $count);
    }

    /** @test */
    public function receiving_exact_number_of_products()
    {
        $count = 3;

        $this->createProductCategoriesWithProducts($count);

        $response = $this->get('/api/products');

        $response->assertOk()->assertJsonCount(3);
    }

    /** @test */
    public function receiving_exact_product_by_its_id()
    {
        $count = 5;

        $this->createProductCategoriesWithProducts($count);

        $productExistsId = 4;

        $response = $this->get('/api/products/' . $productExistsId);

        $response->assertOk()->assertJsonCount(1);

        $productNotExistsId = 6;

        $response = $this->get('/api/products/' . $productNotExistsId);

        $response->assertNotFound();
    }
}
