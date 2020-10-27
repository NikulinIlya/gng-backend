@component('mail::message')
    # Order Received

    Thank you for your order in G&G shop.
    Our manager will contact you soon.
    Your application number: {{ $order->id }}

    **Order Total:** {{ $order->price }}

    **Items Ordered**

    @foreach ($order->products as $product)
        Name: {{ $product->name }} <br>
        Quantity: {{ $product->pivot->quantity }} <br>
        Price: {{ $product->price }} rubles<br>
        Case Price: {{ $product->case_price }} rubles<br>
    @endforeach

    You can get further details about your order by logging into our website.

    @component('mail::button', ['url' => config('app.url'), 'color' => 'green'])
        Go to Website
    @endcomponent

    Thank you again for choosing us.

    Regards,<br>
    {{ config('app.name') }}
@endcomponent
