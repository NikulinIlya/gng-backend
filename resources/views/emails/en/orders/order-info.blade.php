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
    {{$key+1}}.
    Name: {{ $product->name }}
    Vendor Code: {{ $product->vendor_code }}
    Quantity: {{ $product->pivot->quantity }}
    Type: {{ $product->pivot->type }}
    @if($product->case_price > 0)
Case Price: {{ $product->case_price * $product->pivot->quantity}} rubles
    @else
Price: {{ $product->price * $product->pivot->quantity }} rubles
    @endif
@endforeach

@endcomponent
