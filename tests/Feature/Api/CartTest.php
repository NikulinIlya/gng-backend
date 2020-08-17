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
            ->each(function ($productCategory) {
                $productCategory->products()->save(factory(Product::class)->make());
            });
    }
}
