<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductCategoryController
{
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

        $products = $this->service->getProductsEntities($request, [$productCategoryId], [$request->categorySlug]);

        return $this->service->paginate($products, 10);
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getStrongDrinks(Request $request)
    {
        if ($strongDrinksNames = $request->input('category')) {
            $productCategoriesIds = ProductCategory::whereIn('slug', $strongDrinksNames)->get()->map(function ($category) {
                return $category->id;
            });
        } else {
            $strongDrinks = ProductCategory::where('is_strong_drink', 1)->get();

            $strongDrinksNames = $strongDrinks->map(function ($category) {
                return $category->slug;
            });

            $productCategoriesIds = $strongDrinks->map(function ($category) {
                return $category->id;
            });
        }

        $strongProducts = $this->service->getProductsEntities($request, $productCategoriesIds->toArray(), $strongDrinksNames);

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
        $filters = [
            'brands' => [],
            'locations' => [],
            'colours' => [],
        ];

        $strongDrinks = ProductCategory::where('is_strong_drink', 1)->get();

        $filters['strong_drinks'] = $this->service->makeEntityCollection($strongDrinks, app()->getLocale());

        $strongDrinksNames = $strongDrinks->map(function ($category) {
            return $category->slug;
        });

        foreach ($strongDrinksNames as $drink) {
            $filter = $this->getFilters($drink);

            foreach ($filter['brands'] as $brand) {
                if (! in_array($brand, $filters['brands'])) {
                    $filters['brands'][] = $brand;
                }
            }

            foreach ($filter['locations'] as $location) {
                if (! in_array($location, $filters['locations'])) {
                    $filters['locations'][] = $location;
                }
            }

            if (array_key_exists('colours', $filter)) {
                foreach ($filter['colours'] as $colour) {
                    if (! in_array($colour, $filters['colours'])) {
                        $filters['colours'][] = $colour;
                    }
                }
            }
        }

        return $filters;
    }
}
