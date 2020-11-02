@component('mail::message')
    # Order Received

    Thank you for your order in Grapes & Grains shop.
    Our manager will contact you soon.
    Your application number: {{ $order->id }}

    **Order Total:** {{ $order->price }} rubles

    **Items Ordered**

    @foreach ($order->products as $key => $product)
    **{{$key+1}}.**
    Name: {{ $product->name }}
    Quantity: {{ $product->pivot->quantity }}
    Type: {{ $product->pivot->type === 'single' ? 'single bottle' : 'a case of bottles' }}
    Price: {{ ($product->pivot->type === 'single' ? $product->price : $product->case_price) * $product->pivot->quantity }} rubles
    @endforeach

    You can get further details about your order by logging into our website.

    @component('mail::button', ['url' => config('app.url'), 'color' => 'green'])
        Go to Website
    @endcomponent

    Thank you again for choosing us!

    Regards,<br>
    {{ config('app.name') }}
@endcomponent
