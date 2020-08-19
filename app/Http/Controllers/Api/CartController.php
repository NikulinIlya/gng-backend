<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CartItemStoreRequest;
use App\Http\Services\ProductStockService;
use Cart;
use Illuminate\Http\Request;

class CartController
{
    /**
     * Display all cart items.
     *
     * @return \Illuminate\Support\Collection
     */
    public function index()
    {
        return Cart::content();
    }

    /**
     * Get total price of products in a cart.
     *
     * @return string
     */
    public function total()
    {
        return Cart::total();
    }

    /**
     * Get count of products in a cart.
     *
     * @return string
     */
    public function count()
    {
        return Cart::count();
    }

    /**
     * Add an item to a cart.
     *
     * @param CartItemStoreRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CartItemStoreRequest $request)
    {
        $duplicates = Cart::search(
            function ($cartItem, $rowId) use ($request) {
                return $cartItem->id === $request->id;
            }
        );

        if ($duplicates->isNotEmpty()) {
            return response()->json(['message' => 'Item is already in the cart'], 400);
        }

        Cart::add($request->id, $request->name, $request->quantity, $request->price, '', ['type' => $request->type])
            ->associate('App\Models\Product');

        return response()->json(['message' => 'Item was added to the cart'], 200);
    }

    /**
     * Clear a cart.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function clear()
    {
        Cart::destroy();

        return response()->json(['message' => 'Cart is clear'], 204);
    }

    /**
     * Change an item of a cart.
     *
     * @param Request $request
     * @param int     $rowId
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $rowId)
    {
        $validator = \Validator::make(
            $request->all(),
            [
                'quantity' => 'required|numeric',
            ]
        );

        if ($validator->fails()) {
            return response()->json([$validator->errors()], 400);
        }

        $service = new ProductStockService();

        if ($request->quantity > $service->getProductAvailableQuantity($request->productId)) {
            return response()->json(['message' => 'We currently do not have enough items in stock'], 400);
        }

        Cart::update($rowId, $request->quantity);

        return response()->json(['message' => 'Quantity was updated successfully!'], 200);
    }

    /**
     * Remove an item from a cart.
     *
     * @param int $rowId
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function remove($rowId)
    {
        Cart::remove($rowId);

        return response()->json(['message' => 'Item has been removed'], 204);
    }
}
