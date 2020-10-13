<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use Cart;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Get all orders of the current logged-in user.
     *
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        return Order::where('user_id', $request->user()->id)->get();
    }

    /**
     * Store an order of a current logged-in user.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        if (! $request->filled('cart')) {
            return response()
                ->json([
                    'Error' => 'Empty cart',
                ], 400);
        }

        $cart = $request->input('cart');

        $orderInfo = [];
        $price = 0;
        foreach ($cart['order'] as $key => $cartItem) {
            $product = Product::find($cartItem['id']);

            $productPrice = ($cartItem['unit'] === 'thing') ? $product->price : $product->case_price;
            $price += $productPrice;
            $orderInfo[$key] = [
                'vendor_code' => $product->vendor_code,
                'price' => $productPrice,
                'quantity' => $cartItem['quantity'],
                'type' => ($cartItem['unit'] === 'thing') ? 'single' : 'case',
            ];
        }

        Order::create([
            'price' => $price,
            'user_id' => $request->user()->id,
            'order_status_id' => 1,
            'order_info' => json_encode($orderInfo),
            'comment' => $request->input('comment')
        ]);

        return response()
            ->json([
                'Message' => 'Order created',
            ], 201);
    }

    protected function addToOrdersTables($request, $error)
    {
        // Insert into orders table
        $order = Order::create([
            'user_id' => auth()->user() ? auth()->user()->id : null,
            'error' => $error,
        ]);

        // Insert into order_product table
        foreach (Cart::content() as $item) {
            OrderProduct::create([
                'order_id' => $order->id,
                'product_id' => $item->model->id,
                'quantity' => $item->qty,
            ]);
        }

        return $order;
    }

    protected function decreaseQuantities()
    {
        foreach (Cart::content() as $item) {
            $product = Product::find($item->model->id);

            $product->update(['quantity' => $product->quantity - $item->qty]);
        }
    }

    protected function productsAreNoLongerAvailable()
    {
        foreach (Cart::content() as $item) {
            $product = Product::find($item->model->id);

            if ($product->quantity < $item->qty) {
                return true;
            }
        }

        return false;
    }
}
