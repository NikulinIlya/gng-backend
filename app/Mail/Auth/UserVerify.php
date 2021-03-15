<?php

namespace App\Mail\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserVerify extends Mailable
{
    use Queueable, SerializesModels;

    protected $username;
    protected $email;
    protected $verifyCode;

    /**
     * Create a new message instance.
     *
     * @param string $username
     * @param string $email
     * @param string $verifyCode
     */
    public function __construct($username, $email, $verifyCode)
    {
        $this->username = $username;
        $this->email = $email;
        $this->verifyCode = $verifyCode;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $lang = app()->getLocale();

        return $this->from(env('MAIL_FROM_ADDRESS'), 'GnG.wine')
                    ->to($this->email, $this->username)
                    ->replyTo(env('MAIL_FROM_ADDRESS'), 'GnG.wine')
                    ->subject(($lang === 'ru') ? 'Пожалуйста, подтвердите ваш Email!' : 'Please confirm your Email!')
                    ->markdown("emails.$lang.auth.registration")
                    ->with('verifyUrl', env('APP_URL') . '?verify_code=' . $this->verifyCode);
    }
}
