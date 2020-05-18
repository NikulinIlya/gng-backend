<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;


class Vodka extends Model
{
    use Translatable;
    protected $translatable = ['name','raw', 'taste', 'cheese', 'recommendations'];
}
