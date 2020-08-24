<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Location;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductCategoryController
{
    const STRONG_DRINKS = ['cognac', 'liquor', 'whiskey', 'vodka'];

    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * ProductCategoryController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new ProductCategory());
    }

    /**
     * Display a listing of product categories.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified product category.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }

    /**
     * Display a listing of products sorted by category.
     *
     * @param Request $request
     *
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getProductsByCategory(Request $request)
    {
        $productCategoryId = ProductCategory::where('slug', $request->categorySlug)->firstOrFail()->id;

        $products = $this->service->getProductsEntities($request, [$productCategoryId]);

        return $this->service->paginate($products, 10);
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getStrongDrinks(Request $request)
    {
        //$strongProducts = [];

        $strongDrinksNames = $request->input('category') ?? self::STRONG_DRINKS;

        $productCategoriesId = ProductCategory::whereIn('slug', $strongDrinksNames)->get()->map(function ($category) {
            return $category->id;
        });

        $strongProducts = $this->service->getProductsEntities($request, $productCategoriesId->toArray());
        /*foreach ($strongDrinksNames as $strongDrinksName) {
            $drinks = $this->service->getProductsEntities($strongDrinksName);

            foreach ($drinks as $item) {
                $strongProducts[] = $item;
            }
        }*/

        return $strongProducts;
        return $this->service->paginate($strongProducts, 10);
    }

    /**
     * Get all unique filters for the needed product category.
     *
     * @param string $categorySlug
     * @return array
     */
    public function getFilters($categorySlug)
    {
        return $this->service->getFilters($categorySlug);
    }

    /**
     * Get all filters.
     *
     * @return array
     */
    public function getStrongDrinksFilters()
    {
        $filters = [];

        foreach (self::STRONG_DRINKS as $drink) {
            $filter = $this->getFilters($drink);

            foreach ($filter['brands'] as $brand) {
                $filters['brands'][] = $brand;
            }

            foreach ($filter['locations'] as $location) {
                $filters['locations'][] = $location;
            }

            if (array_key_exists('colours', $filter)) {
                foreach ($filter['colours'] as $colour) {
                    $filters['colours'][] = $colour;
                }
            }
        }

        return $filters;
    }
}
