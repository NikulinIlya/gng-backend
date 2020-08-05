<?php

namespace App\Models;

use Laravel\Scout\Searchable;

class Translation extends \TCG\Voyager\Models\Translation
{
    use Searchable;

    public $asYouType = true;

    public function toSearchableArray()
    {
        $array = $this->toArray();

        return [
            'id' => $array['id'],
            'value' => $array['value'],
        ];
    }
}
