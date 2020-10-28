@component('mail::message')
    # An Order Has Been Made

    **Order ID:** {{ $order->id }}

    **Order Total:** {{ $order->price }}

    **User Email:** {{ $order->email }}

    **User Name:** {{ $order->username }}

    **User Phone:** {{ $order->phone }}

    **Order Comment:** {{ $order->comment }}

    **Items Ordered**

    @foreach ($order->products as $product)
        Name: {{ $product->name }} <br>
        Vendor Code: {{ $product->vendor_code }} <br>
        Quantity: {{ $product->pivot->quantity }} <br>
        Type: {{ $product->pivot->type }} <br>
        Price: {{ $product->price }} rubles <br>
        Case Price: {{ $product->case_price }} rubles <br>
    @endforeach

@endcomponent
