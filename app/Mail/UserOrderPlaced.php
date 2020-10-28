<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserOrderPlaced extends Mailable
{
    use Queueable, SerializesModels;

    protected $order;

    /**
     * Create a new message instance.
     *
     * @param Order  $order
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $lang = app()->getLocale();

        return $this->from(env('MAIL_FROM_ADDRESS'))
                    ->to($this->order->email, $this->order->name)
                    ->subject('A new order')
                    ->markdown("emails.$lang.orders.placed");
    }
}
