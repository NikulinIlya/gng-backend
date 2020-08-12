<?php

namespace App\Http\Services\Cart;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Collection;

class DatabaseCartService implements CartManager
{
    /**
     * @var int
     */
    protected $userId;

    /**
     * DatabaseCartService constructor.
     * @param int $userId
     */
    public function __construct($userId)
    {
        $this->userId = $userId;
    }

    public function getCart()
    {
        return Cart::firstOrCreate(['user_id' => $this->userId]);
    }

    public function addToCart($productId, $type = 'single', $price = null, $quantity = 1): Product
    {
        $product = Product::find($productId);

        if (! $this->isInCart($productId)) {
            $cart = $this->getCart();

            $cart->items()->create([
                'product_id' => $productId,
                'type' => $type,
                'price' => $price == null ? $product->price : $price,
                'product' => $product,
                'image' => $product->image,
                'quantity' => $quantity,
            ]);
        }

        return $product;
    }

    public function removeFromCart($productId): bool
    {
        $cart = $this->getCart();

        $cartItem = $cart->items()->whereProductId($productId)->first();

        if ($cartItem) {
            $cartItem->delete();
        }

        return true;
    }

    public function getCartItems(): Collection
    {
        // TODO: Implement getCartItems() method.
    }

    public function isInCart($productId): bool
    {
        $cart = $this->getCart();

        return CartItem::whereCartId($cart->id)->whereProductId($productId)->count() > 0;
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
