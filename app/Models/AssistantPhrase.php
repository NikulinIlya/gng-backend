<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;

class AssistantPhrase extends Model
{
    use Translatable;
    protected $translatable = ['phrase'];

    /**
     * Get the assistant that owns the phrase.
     */
    public function assistant()
    {
        return $this->belongsTo('App\Models\Assistant');
    }
}
