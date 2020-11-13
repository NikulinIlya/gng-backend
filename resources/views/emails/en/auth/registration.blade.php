@component('mail::message')
    # Hello!
    Thank you for filling out the subscription form on our website {{ env('APP_URL') }}

    Please <a href="{{ $this->verifyUrl }}">confirm</a> your email address!
    @component('mail::button', ['url' => $this->verifyUrl])
        Confirm
    @endcomponent

    <hr>
    By confirming your email, you consent to the <a href="{{ env('APP_URL') . '/static?doc=3' }}">processing and storage of personal data.</a>

    GNG.WINE
@endcomponent
