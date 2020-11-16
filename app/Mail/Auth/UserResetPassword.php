<?php

namespace App\Mail\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserResetPassword extends Mailable
{
    use Queueable, SerializesModels;

    protected $username;
    protected $email;
    protected $resetCode;

    /**
     * Create a new message instance.
     *
     * @param string $username
     * @param string $email
     * @param string $resetCode
     */
    public function __construct($username, $email, $resetCode)
    {
        $this->username = $username;
        $this->email = $email;
        $this->resetCode = $resetCode;
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
                    ->subject(($lang === 'ru') ? 'Сброс пароля на gng.wine' : 'Reset password on gng.wine')
                    ->markdown("emails.$lang.auth.reset-password")
                    ->with('resetUrl', env('APP_URL') . '?reset_code=' . $this->resetCode);
    }
}
