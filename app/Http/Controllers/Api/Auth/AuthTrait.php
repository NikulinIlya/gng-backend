<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Support\Facades\Hash;

trait AuthTrait
{
    /**
     * @param int    $id
     * @param string $name
     *
     * @return string
     */
    protected function makeVerifyCode($id, $name)
    {
        return Hash::make($id . $name . time() . env('OTP_SALT'));
    }
}
