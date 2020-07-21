<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SecuredHttp
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (env('APP_ENV') === 'production') {
            $request->setTrustedProxies([$request->getClientIp()], Request::HEADER_X_FORWARDED_ALL);
            if (! $request->secure()) {
                return redirect()->secure($request->getRequestUri());
            }
        }

        return $next($request);
    }
}
