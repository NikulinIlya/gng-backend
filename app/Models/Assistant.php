<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assistant extends Model
{
    /**
     * Get the phrases for the assistant.
     */
    public function assistantPhrases()
    {
        return $this->hasMany('App\Models\AssistantPhrase');
    }
}
