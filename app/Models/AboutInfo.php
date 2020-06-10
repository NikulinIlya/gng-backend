<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;

class AboutInfo extends Model
{
    use Translatable;
    protected $translatable = ['name', 'text'];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'about_info';
}
