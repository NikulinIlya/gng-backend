<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Mail\UserWelcome;
use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Log;
use Mail;

class VerificationController extends Controller
{
    /**
     * Handle a registration request for the application.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function verify(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'verify_code' => ['required', 'string', 'max:255'],
            ]
        );

        if ($validator->fails()) {
            return response()
                ->json(
                    [
                        'error' => 'wrong data',
                    ],
                    422
                );
        }

        $user = User::where('verify_hash_code', $request->verify_code)->firstOrFail();

        try {
            Mail::send(new UserWelcome($user));
        } catch (\Exception $exception) {
            Log::error('Error sending UserWelcome mail: ' . $exception->getMessage());
        }

        return response()->json(['token' => $user->createToken('authToken')->plainTextToken], 201);
    }
}
