<?php

namespace App\Widgets;

use App\Models\GrapeSort;
use Illuminate\Support\Facades\Auth;
use TCG\Voyager\Widgets\BaseDimmer;

class GrapeSortDimmer extends BaseDimmer
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
        $count = GrapeSort::count();
        $string = trans_choice('grape sorts', $count);
        $titleString = mb_convert_case($string, MB_CASE_TITLE);

        return view('voyager::dimmer', array_merge($this->config, [
            'icon' => 'voyager-tree',
            'title' => "{$count} {$titleString}",
            'text' => "You have $count $string in your database. Click on button below to view all of them.",
            'button' => [
                'text' => "View all $string",
                'link' => route('voyager.grape-sorts.index'),
            ],
            'image' => asset('/storage/widgets/grape.jpg'),
        ]));
    }

    /**
     * Determine if the widget should be displayed.
     *
     * @return bool
     */
    public function shouldBeDisplayed()
    {
        return Auth::user()->can('browse', app(GrapeSort::class));
    }
}
