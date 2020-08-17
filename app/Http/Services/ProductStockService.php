<?php

namespace App\Http\Services;

use App\Models\Product;

class ProductStockService
{
    public function getProductAvailableQuantity($productId)
    {
        $product = Product::find($productId);

        return 10;
    }
}
