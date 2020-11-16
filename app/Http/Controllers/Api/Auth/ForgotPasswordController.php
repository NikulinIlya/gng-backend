<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Mail\Auth\UserResetPassword;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Log;
use Mail;

class ForgotPasswordController extends Controller
{
    use AuthTrait;

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function forgot(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'email' => ['required', 'string', 'email:rfc,dns', 'max:255'],
            ]
        );

        if ($validator->fails()) {
            return response()->json(['error' => 'wrong data',], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (! $user) {
            return response()->json(['error' => 'wrong data'], 400);
        }

        $user->reset_password_code = $this->makeVerifyCode($user->id, $user->name);
        $user->save();

        try {
            Mail::send(new UserResetPassword($user->name, $user->email, $user->reset_password_code));

            return response()->json(['message' => 'reset password email has sent']);
        } catch (\Exception $exception) {
            Log::error('Error sending UserVerify mail: ' . $exception->getMessage());

            return response()->json(['error' => 'sending email'], 400);
        }
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function reset(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'reset_code' => ['required', 'string', 'max:255'],
                'password'   => ['required', 'string', 'min:8', 'confirmed'],
            ]
        );

        if ($validator->fails()) {
            return response()->json(['error' => 'wrong data'], 422);
        }

        $user = User::where('reset_password_code', $request->reset_code)->first();

        if (! $user) {
            return response()->json(['error' => 'wrong data'], 422);
        }

        if (time() - strtotime($user->updated_at->toDateTimeString()) > 3600) {
            return response()->json(['error' => 'the link is outdated'], 422);
        }

        $user->password = Hash::make($request->password);
        $user->reset_code = null;
        $user->save();

        return response()->json(['token' => $user->createToken('authToken')->plainTextToken], 201);
    }
}
