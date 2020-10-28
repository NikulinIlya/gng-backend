@component('mail::message')
    # Заказ получен

    Благодарим за заказ в магазине Grapes & Grains.
    Наш менеджер свяжется с вами в ближайшее время.
    Номер вашей заявки: 12345678

    **Весь заказ:** 10000

    @php
        // Test data
        $products = [
            0 => [
                'name' => 'Product 1',
                'vendor_code' => '12345678',
                'quantity' => 1,
                'type' => 'single',
                'price' => 3000,
                'case_price' => 18000,
            ],
            1 => [
                'name' => 'Product 2',
                'vendor_code' => '12345679',
                'quantity' => 2,
                'type' => 'single',
                'price' => 3500,
                'case_price' => 21000,
            ],
        ];
    @endphp

    **Заказанные товары**

    @foreach ($products as $product)
        Название: {{ $product['name'] }} <br>
        Количество: {{ $product['quantity'] }} <br>
        Тип: {{ $product['type'] === 'single' ? 'По одной бутылке' : 'Ящик' }} <br>
        Цена: {{ $product['type'] === 'single' ? $product['price'] : $product['case_price'] }} rubles<br>
    @endforeach

    Вы можете получить более подробную информацию о своем заказе, зайдя на наш сайт.

    @component('mail::button', ['url' => config('app.url'), 'color' => 'green'])
        Перейти на сайт
    @endcomponent

    Еще раз спасибо за то, что выбрали нас!

    С уважением,<br>
    {{ config('app.name') }}
@endcomponent
