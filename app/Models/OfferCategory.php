<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;

class OfferCategory extends Model
{
    use Translatable;
    protected $translatable = ['name', 'description'];
}
