<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;


class AssistantPhrase extends Model
{
    use Translatable;
    protected $translatable = ['phrase'];
}
