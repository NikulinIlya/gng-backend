@component('mail::message')
    # An Order Has Been Made

    **Order ID:** 123

    **Order Total:** 10000

    **User Email:** test@mail.com

    **User Name:** Jack

    **User Phone:** 89001234567

    **Order Comment:** Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, nostrum.

    **Items Ordered**

    @php
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

    @foreach ($products as $product)
        Name: {{ $product['name'] }} <br>
        Vendor Code: {{ $product['vendor_code'] }} <br>
        Quantity: {{ $product['quantity'] }} <br>
        Type: {{ $product['type'] }} <br>
        Price: {{ $product['price'] }} rubles <br>
        Case Price: {{ $product['case_price'] }} rubles <br>
    @endforeach

@endcomponent
