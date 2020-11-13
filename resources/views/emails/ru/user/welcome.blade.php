@component('mail::message')
# Здравствуйте!

Ваш email успешно подтвержден.

@component('mail::button', ['url' => '/'])
Перейти к покупкам
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
