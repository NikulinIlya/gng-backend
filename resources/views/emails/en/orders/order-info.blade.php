@component('mail::message')
    # An Order Has Been Made

    **Order ID:** {{ $order->id }}

    **Order Total:** {{ $order->price }}

    **User Email:** {{ $order->email }}

    **User Name:** {{ $order->username ?? '--' }}

    **User Phone:** {{ $order->phone ?? '--' }}

    **Order Comment:** {{ $order->comment ?? '--' }}

    **Items Ordered:**

    @foreach ($order->products as $key => $product)
    **{{$key+1}}.**
    Name: {{ $product->name }}
    Vendor Code: {{ $product->vendor_code }}
    Quantity: {{ $product->pivot->quantity }}
    Type: {{ $product->pivot->type }}
    Price: {{ $product->price }} rubles
    Case Price: {{ $product->case_price }} rubles
    @endforeach
@endcomponent
