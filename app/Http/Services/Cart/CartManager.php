<?php


namespace App\Http\Services\Cart;


use App\Models\Product;
use Illuminate\Support\Collection;

interface CartManager
{
    function getCart();

    public function addToCart($productId): Product;

    public function removeFromCart($productId): bool;

    public function getCartItems(): Collection;

    public function isInCart($productId): bool;

    public function clearCartItems(): bool;

    public function isCartEmpty():bool;
}
