@component('mail::message')
# Добро пождаловать на G&G!

Тело сообщения

@component('mail::button', ['url' => '/'])
Текст кнопки
@endcomponent

Спасибо,<br>
{{ config('app.name') }}
@endcomponent
