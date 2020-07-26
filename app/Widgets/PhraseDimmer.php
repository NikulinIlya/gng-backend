<?php

namespace App\Widgets;

use App\Models\MainPhrase;
use Illuminate\Support\Facades\Auth;
use TCG\Voyager\Widgets\BaseDimmer;

class PhraseDimmer extends BaseDimmer
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
        $count = MainPhrase::count();
        $string = trans_choice('phrases', $count);
        $titleString = mb_convert_case($string, MB_CASE_TITLE);

        return view('voyager::dimmer', array_merge($this->config, [
            'icon' => 'voyager-receipt',
            'title' => "{$count} {$titleString}",
            'text' => "You have $count $string in your database. Click on button below to view all of them.",
            'button' => [
                'text' => "View all $string",
                'link' => route('voyager.main-phrases.index'),
            ],
            'image' => asset('/storage/widgets/phrase.jpg'),
        ]));
    }

    /**
     * Determine if the widget should be displayed.
     *
     * @return bool
     */
    public function shouldBeDisplayed()
    {
        return Auth::user()->can('browse', app(MainPhrase::class));
    }
}
