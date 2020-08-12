<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\Cart\CartManager;
use Illuminate\Support\Collection;

class CartController
{
    protected $cart;

    public function __construct(CartManager $cart)
    {
        $this->cart = $cart;
    }

    public function getProducts(): Collection
    {
        return $this->cart->getCartItems();
    }

    public function addProduct($id)
    {
        $this->cart->addToCart($id);

        return $this->cart->getCartItems();
    }

    public function removeProduct($id)
    {
        $this->cart->removeFromCart($id);

        return $this->cart->getCartItems();
    }

    public function clear()
    {
        $this->cart->clearCartItems();

        return $this->cart->getCartItems();
    }
}
