<?php

namespace App\Http\Middleware;

use App\Http\Services\Cart\DatabaseCartService;
use App\Http\Services\Cart\SessionCartService;
use Auth;
use Closure;

class CartResolutionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::check()) {
            app()->bind('App\Cart\CartManager', function ($app) {
                return new DatabaseCartService(Auth::id());
            });
        } else {
            app()->bind('App\Cart\CartManager', function ($app) {
                return new SessionCartService();
            });
        }

        return $next($request);
    }
}
