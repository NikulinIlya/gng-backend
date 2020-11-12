<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserWelcome extends Mailable
{
    use Queueable, SerializesModels;

    protected $user;

    /**
     * Create a new message instance.
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
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
        $subject = ($lang === 'ru') ? 'Регистрация на сайте gng.wine прошла успешно!' : 'Registration on the gng.wine website was successful!';

        return $this->from(env('MAIL_FROM_ADDRESS'), $fromName)
                    ->to($this->user->email, $this->user->name)
                    ->replyTo(env('MAIL_FROM_ADDRESS'), $fromName)
                    ->subject($subject)
                    ->markdown("emails.$lang.user.welcome")
                    ->with('user', $this->user);
    }
}
