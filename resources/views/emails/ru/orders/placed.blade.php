@component('mail::message')
    # Заказ получен

    Благодарим за заказ в магазине Grapes & Grains.
    Наш менеджер свяжется с вами в ближайшее время.
    Номер вашей заявки: {{ $order->id }}

    **Весь заказ:** {{ $order->price }}

    **Заказанные товары**

    @foreach ($order->products as $product)
        Название: {{ $product->name }} <br>
        Количество: {{ $product->pivot->quantity }} <br>
        Тип: {{ $product->pivot->type === 'single' ? 'По одной бутылке' : 'Ящик' }} <br>
        Цена: {{ $product->pivot->type === 'single' ? $product->price : $product->case_price }}р <br>
    @endforeach

    Вы можете получить более подробную информацию о своем заказе, зайдя на наш сайт.

    @component('mail::button', ['url' => config('app.url'), 'color' => 'green'])
        Перейти на сайт
    @endcomponent

    Еще раз спасибо за то, что выбрали нас!

    С уважением,<br>
    {{ config('app.name') }}
@endcomponent
