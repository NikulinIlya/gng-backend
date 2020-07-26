<?php

namespace App\Widgets;

use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use TCG\Voyager\Widgets\BaseDimmer;

class ProductDimmer extends BaseDimmer
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
        $count = Product::count();
        $string = trans_choice('products', $count);
        $titleString = mb_convert_case($string, MB_CASE_TITLE);

        return view('voyager::dimmer', array_merge($this->config, [
            'icon' => 'voyager-shop',
            'title' => "{$count} {$titleString}",
            'text' => "You have $count $string in your database. Click on button below to view all of them.",
            'button' => [
                'text' => "View all $string",
                'link' => route('voyager.products.index'),
            ],
            'image' => asset('/storage/widgets/assorted-drinks.jpg'),
        ]));
    }

    /**
     * Determine if the widget should be displayed.
     *
     * @return bool
     */
    public function shouldBeDisplayed()
    {
        return Auth::user()->can('browse', app(Product::class));
    }
}
