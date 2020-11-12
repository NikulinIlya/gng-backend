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
     * @param Order $order
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

        $fromName = ($lang === 'ru') ? 'Менеджеры магазина gng.wine' : 'Gng.wine store managers';
        $subject = (($lang === 'ru') ? 'Заказ товаров на сайте gng.wine #' : 'Ordering goods on the website gng.wine #').$this->order->id;

        return $this->from(env('MAIL_FROM_ADDRESS'), $fromName)
                    ->to($this->order->email, $this->order->name)
                    ->replyTo(env('MAIL_FROM_ADDRESS'), $fromName)
                    ->subject($subject)
                    ->markdown("emails.$lang.orders.placed")
                    ->with('order', $this->order);
    }
}
