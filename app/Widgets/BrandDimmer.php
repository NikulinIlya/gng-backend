<?php

namespace App\Widgets;

use App\Models\Brand;
use Illuminate\Support\Facades\Auth;
use TCG\Voyager\Widgets\BaseDimmer;

class BrandDimmer extends BaseDimmer
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
        $count = Brand::count();
        $string = trans_choice('brands', $count);
        $titleString = mb_convert_case($string, MB_CASE_TITLE);

        return view('voyager::dimmer', array_merge($this->config, [
            'icon' => 'voyager-leaf',
            'title' => "{$count} {$titleString}",
            'text' => "You have $count $string in your database. Click on button below to view all of them.",
            'button' => [
                'text' => "View all $string",
                'link' => route('voyager.brands.index'),
            ],
            'image' => asset('/storage/widgets/brands.jpg'),
        ]));
    }

    /**
     * Determine if the widget should be displayed.
     *
     * @return bool
     */
    public function shouldBeDisplayed()
    {
        return Auth::user()->can('browse', app(Brand::class));
    }
}
