<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CartItemStoreRequest;
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
     * @param int     $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validator = \Validator::make(
            $request->all(),
            [
                'quantity' => 'required|numeric|between:1,5',
            ]
        );

        if ($validator->fails()) {
            session()->flash('errors', collect(['Quantity must be between 1 and 5.']));

            return response()->json(['success' => false], 400);
        }

        if ($request->quantity > $request->productQuantity) {
            session()->flash('errors', collect(['We currently do not have enough items in stock.']));

            return response()->json(['success' => false], 400);
        }

        Cart::update($id, $request->quantity);
        session()->flash('success_message', 'Quantity was updated successfully!');

        return response()->json(['success' => true], 200);
    }

    /**
     * Remove an item from a cart.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function remove($id)
    {
        Cart::remove($id);

        return response()->json(['message' => 'Item has been removed'], 204);
    }
}
