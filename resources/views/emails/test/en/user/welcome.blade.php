@component('mail::message')
# Welcome to G&G!

The body of your message.

@component('mail::button', ['url' => '/'])
Button Text
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
