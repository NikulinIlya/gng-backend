<?php

namespace App\Http\Services\Cart;

use App\Models\Product;
use Illuminate\Support\Collection;

class SessionCartService implements CartManager
{
    public const CART_KEY = 'cart_session';

    public function getCart()
    {
        if (session()->has(self::CART_KEY)) {
            return session(self::CART_KEY);
        } else {
            $newCart = collect();
            session([self::CART_KEY => $newCart]);

            return $newCart;
        }
    }

    public function addToCart($productId, $type = 'single', $price = null, $quantity = 1): Product
    {
        $cart = $this->getCart();

        $product = Product::find($productId);

        $item = collect([
            'product_id' => $productId,
            'type' => $type,
            'price' => $price == null ? $product->price : $price,
            'product' => $product,
            'image' => $product->image,
            'quantity' => $quantity,
        ]);

        $a = collect($item);

        if (! $this->isInCart($productId)) {
            $cart = $cart->push(collect($item));
            session([self::CART_KEY => $cart]);
        }

        return $product;
    }

    public function removeFromCart($productId): bool
    {
        // TODO: Implement removeFromCart() method.
    }

    public function getCartItems(): Collection
    {
        // TODO: Implement getCartItems() method.
    }

    public function isInCart($productId): bool
    {
        $cart = $this->getCart();

        $result = $cart->where('product_id', $productId);

        return $result->count() > 0;
    }

    public function clearCartItems(): bool
    {
        // TODO: Implement clearCartItems() method.
    }

    public function isCartEmpty(): bool
    {
        // TODO: Implement isCartEmpty() method.
    }
}
