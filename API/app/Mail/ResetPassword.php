<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Lang;

class ResetPassword extends Mailable
{
    use Queueable, SerializesModels;
    public $user, $url;
    public $token;
    public static $createUrlCallback;
    public static $toMailCallback;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user,$url,$token)
    {
        $this->user=$user;
        $this->url=$url;
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('view.name');
    }
}
