@component('mail::message')
    # Hello!

    Your email has been successfully verified.

    @component('mail::button', ['url' => '/'])
        Go to shopping
    @endcomponent

    Thanks,<br>
    {{ config('app.name') }}
@endcomponent
