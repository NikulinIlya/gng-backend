<?php

namespace App\Widgets;

use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use TCG\Voyager\Widgets\BaseDimmer;

class OrderDimmer extends BaseDimmer
{
    /**
     * The configuration array.
     *
     * @var array
     */
    protected $config = [];

    /**
     * Treat this method as a controller action.
     * Return view() or other content to display.
     */
    public function run()
    {
        $count = Order::count();
        $string = trans_choice('orders', $count);
        $titleString = mb_convert_case($string, MB_CASE_TITLE);

        return view('voyager::dimmer', array_merge($this->config, [
            'icon' => 'voyager-basket',
            'title' => "{$count} {$titleString}",
            'text' => "You have $count $string in your database. Click on button below to view all of them.",
            'button' => [
                'text' => "View all $string",
                'link' => route('voyager.orders.index'),
            ],
            'image' => asset('/storage/widgets/order.jpg'),
        ]));
    }

    /**
     * Determine if the widget should be displayed.
     *
     * @return bool
     */
    public function shouldBeDisplayed()
    {
        return Auth::user()->can('browse', app(Order::class));
    }
}
