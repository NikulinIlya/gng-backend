<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Location;
use App\Models\ProductCategory;

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
     * @param $categorySlug
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getProductsByCategory($categorySlug)
    {
        $products = $this->getProductsEntities($categorySlug);

        return $this->service->paginate($products, 10);
    }

    /**
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getStrongDrinks()
    {
        $strongDrinksNames = ['cognac', 'liquor', 'whiskey', 'vodka'];
        $strongProducts = [];

        foreach ($strongDrinksNames as $strongDrinksName) {
            $drinks = $this->getProductsEntities($strongDrinksName);

            foreach ($drinks as $item) {
                $strongProducts[] = $item;
            }
        }

        return $this->service->paginate($strongProducts, 10);
    }

    /**
     * @param string $categorySlug
     * @return \Illuminate\Support\Collection
     */
    protected function getProductsEntities($categorySlug)
    {
        $products = ProductCategory::where('slug', $categorySlug)->firstOrFail()->products;

        return $this->service->makeEntityCollection($products, app()->getLocale());
    }

    /**
     * Get all unique filters for the needed product category.
     *
     * @param string $categorySlug
     * @return array
     */
    public function getFilters($categorySlug)
    {
        $filters = [];

        $products = ProductCategory::where('slug', $categorySlug)->firstOrFail()->products;

        $brands = [];
        $locations = [];
        $hasColours = false;
        $hasGrapes = false;

        if (in_array($categorySlug, ['wine', 'champagne', 'liquor'])) {
            $colours = [];
            $hasColours = true;
        }

        if (in_array($categorySlug, ['wine', 'champagne'])) {
            $grapeSortsUnique = [];
            $hasGrapes = true;
        }
        foreach ($products as $product) {
            if (!in_array($brand = $product->brand, $brands)) {
                $brands[] = $brand;
                if (!in_array($locationId = $brand->location_id, $locations)) {
                    $locations[] = $locationId;
                }
            }
            $entity = $product->$categorySlug()->first();

            if ($entity && $hasColours && !in_array($colour = $entity->colour, $colours)) {
                    $colours[] = $colour;
            }

            if ($entity && $hasGrapes) {
                $grapeSorts = $entity->grapeSorts;
                foreach ($grapeSorts as $grapeSort) {
                    if (!array_key_exists($grapeSort->id, $grapeSortsUnique)) {
                        $grapeSortsUnique[$grapeSort->id] = $grapeSort;
                    }
                }
            }
        }

        $locale = app()->getLocale();

        $filters['brands'] = $this->service->makeEntityCollection($brands, $locale);
        $filters['locations'] = $this->service->makeEntityCollection(Location::find($locations), $locale);

        if ($hasColours) {
            $filters['colours'] = $this->service->makeEntityCollection($colours, $locale);
        }

        if ($hasGrapes) {
            $filters['grape_sorts'] = $this->service->makeEntityCollection($grapeSortsUnique, $locale);
        }

        return $filters;
    }
}
