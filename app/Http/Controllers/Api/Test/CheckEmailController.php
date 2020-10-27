<?php

namespace App\Http\Controllers\Api\Test;

use App\Mail\UserOrderPlaced;
use App\Mail\UserWelcome;
use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;

class CheckEmailController
{
    public function checkWelcomeEmail()
    {
//        return new UserWelcome();
    }

    public function checkValidateEmail()
    {
        $user = User::find(3);

        return (new VerifyEmail())->toMail($user);
    }

    public function checkPlacedOrderEmail()
    {
//        return new UserOrderPlaced();
    }
}
