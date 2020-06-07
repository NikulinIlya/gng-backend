<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;

class Whiskey extends Model
{
    use Translatable;
    protected $translatable = ['name', 'type', 'aging', 'taste', 'cheese', 'recommendations'];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'whiskey';
}
