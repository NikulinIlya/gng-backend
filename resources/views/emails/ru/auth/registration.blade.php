@component('mail::message')
    # Здравствуйте!
    Спасибо за заполнение формы подписки на нашем сайте {{ env('APP_URL') }}

    <a href="{{ $this->verifyUrl }}">Подтвердите</a>, пожалуйста, свой адрес электронной почты!
    @component('mail::button', ['url' => $this->verifyUrl])
        Подтвердить
    @endcomponent

    <hr>

    Подтверждая свой email, вы даете согласие на <a href="{{ env('APP_URL') . '/static?doc=3' }}">обработку и хранение персональных данных.</a>

    GNG.WINE
@endcomponent
