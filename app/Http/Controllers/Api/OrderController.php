<?php

namespace App\Http\Controllers\Api;

use App\Exports\OrdersExport;
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
     *
     * @return mixed
     */
    public function index(Request $request)
    {
        return $request->user()->orders()->with('products')->get();
    }

    /**
     * Store an order of a current logged-in user.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        if (! $request->filled('cart')) {
            return response()
                ->json(
                    [
                        'Error' => 'Empty cart',
                    ],
                    400
                );
        }

        $cart = $request->input('cart');

        $price = 0;
        foreach ($cart['order'] as $key => $cartItem) {
            $productPrice = ($cartItem['unit'] === 'thing')
                ? Product::find($cartItem['id'])->price
                : Product::find($cartItem['id'])->case_price;

            $price += $productPrice;
        }

        $order = Order::create(
            [
                'price'           => $price,
                'user_id'         => $request->user()->id,
                'username'        => $request->user()->name,
                'email'           => $request->user()->email,
                'order_status_id' => 1,
                'comment'         => $request->input('comment'),
                'phone'           => $request->user()->userInfo()->first()->phone,
            ]
        );

        foreach ($cart['order'] as $key => $cartItem) {
            OrderProduct::create(
                [
                    'order_id'   => $order->id,
                    'product_id' => $cartItem['id'],
                    'quantity'   => $cartItem['quantity'],
                    'type'       => ($cartItem['unit'] === 'thing') ? 'single' : 'case',
                ]
            );
        }

        return response()
            ->json(
                [
                    'Message' => 'Order created',
                ],
                201
            );
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

    public function export()
    {
        return new OrdersExport();
    }
}
