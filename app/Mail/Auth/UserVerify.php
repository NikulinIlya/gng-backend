<?php

namespace App\Mail\Auth;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserVerify extends Mailable
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

        return $this->from(env('MAIL_FROM_ADDRESS'), $fromName)
                    ->to($this->user->email, $this->user->name)
                    ->replyTo(env('MAIL_FROM_ADDRESS'), $fromName)
                    ->subject(($lang === 'ru') ? 'Пожалуйста, подтвердите ваш Email!' : 'Please confirm your Email!')
                    ->markdown("emails.$lang.auth.registration")
                    ->with('verifyUrl', env('APP_URL') . '?verify_code=' . $this->user->verify_code);
    }
}
