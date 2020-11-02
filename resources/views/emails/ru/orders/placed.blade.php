@component('mail::message')
    # Заказ получен

    Благодарим за заказ в магазине Grapes & Grains.
    Наш менеджер свяжется с Вами в ближайшее время.
    Номер Вашей заявки: {{ $order->id }}

    **Стоимость всего заказа:** {{ $order->price }}р

    **Заказанные товары**

    @foreach ($order->products as $key => $product)
    **{{$key+1}}.**
    Название: {{ $product->name }}
    Количество: {{ $product->pivot->quantity }}
    Тип: {{ $product->pivot->type === 'single' ? 'по одной бутылке' : 'Ящик' }}
    Цена: {{ ($product->pivot->type === 'single' ? $product->price : $product->case_price) * $product->pivot->quantity }}р
    @endforeach

    Вы можете получить более подробную информацию о своем заказе, зайдя на наш сайт.

    @component('mail::button', ['url' => config('app.url'), 'color' => 'green'])
        Перейти на сайт
    @endcomponent

    Еще раз спасибо за то, что выбрали нас!

    С уважением,
    {{ config('app.name') }}
@endcomponent
