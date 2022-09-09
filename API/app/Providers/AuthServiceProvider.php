<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;



class AuthServiceProvider extends ServiceProvider
{
   
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //this will create the URL which is used in the SPA with a generated token:
        ResetPassword::createUrlUsing(function ($user, string $token) {
            return (env('SPA_URL').'/reset-password?token=' . $token);
        });

        ResetPassword::toMailUsing(function($notifiable,$url){
            
        });
    }
}
