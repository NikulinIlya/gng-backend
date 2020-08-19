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
            ->each(
                function ($productCategory) {
                    $productCategory->products()->save(factory(Product::class)->make());
                }
            );
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

    /** @test */
    public function receiving_products_by_category()
    {
        $firstProductCategory = ProductCategory::first();

        factory(Product::class)
            ->create(
                [
                    'product_category_id' => $firstProductCategory->id,
                ]
            );

        $response = $this->get('/api/products-by-category/'.$firstProductCategory->slug);

        $response->assertOk()
            ->assertJsonStructure([
                'current_page',
                'data',
                'first_page_url',
                'from',
                'last_page',
                'last_page_url',
                'next_page_url',
                'path',
                'per_page',
                'prev_page_url',
                'to',
                'total',
            ]);

        $this->assertCount(2, $response['data'][0]);

        $secondProductCategory = ProductCategory::find(2);

        $response = $this->get('/api/products-by-category/'.$secondProductCategory->slug);

        $response->assertOk();

        $this->assertCount(1, $response['data'][0]);

        $newProductCategory = factory(ProductCategory::class)->create();

        $response = $this->get('/api/products-by-category/'.$newProductCategory->slug);

        $response->assertOk();

        $this->assertCount(0, $response['data'][0]);
    }
}
