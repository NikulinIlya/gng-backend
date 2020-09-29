<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Notifications\EmailVerificationNotification;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Notification;
use Tests\TestCase;

class NotificationEmailTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function it_sends_notification_email()
    {
        $notification = new EmailVerificationNotification();

        $user = factory(User::class)->create(['email_verified_at' => null]);

        $uri = $notification->verificationUrl($user);

        $this->assertSame(null, $user->email_verified_at);

        $this->actingAs($user)->get($uri);

        $this->assertNotNull($user->email_verified_at);
    }

    /** @test */
    public function it_queues_a_verification_notification_email()
    {
        $user = factory(User::class)
            ->make()
            ->makeVisible(['password']);

        Notification::fake();

        Notification::assertNothingSent();

        $this->put(
            route('auth.register.store'),
            $user->toArray()
        );

        $user = User::firstWhere('email', $user->email);

        Notification::assertSentTo($user, EmailVerificationNotification::class);

        Notification::assertTimesSent(1, EmailVerificationNotification::class);
    }
}
