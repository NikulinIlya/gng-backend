@component('mail::message')
    # Order Received

    Thank you for your order in Grapes & Grains shop.
    Our manager will contact you soon.
    Your order number: 12345678

    **Order Total:** 10000

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

    **Items Ordered**

    @foreach ($products as $product)
        Name: {{ $product['name'] }} <br>
        Quantity: {{ $product['quantity'] }} <br>
        Type: {{ $product['type'] === 'single' ? 'Single bottle' : 'A case of bottles' }} <br>
        Price: {{ $product['type'] === 'single' ? $product['price'] : $product['case_price'] }} rubles<br>
    @endforeach

    You can get further details about your order by logging into our website.

    @component('mail::button', ['url' => config('app.url'), 'color' => 'green'])
        Go to Website
    @endcomponent

    Thank you again for choosing us!

    Regards,<br>
    {{ config('app.name') }}
@endcomponent
