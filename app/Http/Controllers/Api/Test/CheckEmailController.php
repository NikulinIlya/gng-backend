<?php

namespace App\Http\Controllers\Api\Test;

class CheckEmailController
{
    public function checkWelcomeEmailEn()
    {
        return view('emails.test.en.user.welcome');
    }

    public function checkWelcomeEmailRu()
    {
        return view('emails.test.ru.user.welcome');
    }

    public function checkPlacedOrderEmailEn()
    {
        app('view')->addNamespace('mail', resource_path('views').'/vendor/mail/html');

        return view('emails.test.en.orders.placed');
    }

    public function checkPlacedOrderEmailRu()
    {
        return view('emails.test.ru.orders.placed');
    }

    public function checkOrderInfoEmail()
    {
        return view('emails.test.en.orders.order-info');
    }

    public function checkValidateEmail()
    {
    }
}
