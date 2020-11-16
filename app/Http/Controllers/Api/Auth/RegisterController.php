<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Mail\Auth\UserVerify;
use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Log;
use Mail;

class RegisterController extends Controller
{
    use AuthTrait;

    /**
     * Handle a registration request for the application.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name'            => ['required', 'string', 'max:255'],
                'email'           => ['required', 'string', 'email:rfc,dns', 'max:255', 'unique:users'],
                'password'        => ['required', 'string', 'min:8', 'confirmed'],
                'second_name'     => ['string', 'max:255', 'nullable'],
                'phone'           => ['string', 'between:11,12', 'nullable'],
                'discount_agreed' => ['boolean', 'nullable'],
                'events_agreed'   => ['boolean', 'nullable'],
            ]
        );

        if ($validator->fails()) {
            return response()->json(['error' => 'wrong data',], 422);
        }

        $user = $this->createUser($request->all());

        if (! $user) {
            return response()->json(['error' => 'wrong data'], 401);
        }

        $user->verify_code = $this->makeVerifyCode($user->id, $user->name);
        $user->save();

        $this->createUserInfo($user->id, $request->all());

        return $this->sendVerifyEmail($user->name, $user->email, $user->verify_code);
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function resendVerificationEmail(Request $request)
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
            return response()->json(['error' => 'wrong data'], 401);
        }

        $user->verify_code = $this->makeVerifyCode($user->id, $user->name);
        $user->save();

        return $this->sendVerifyEmail($user->name, $user->email, $user->verify_code);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param array $data
     *
     * @return User
     */
    protected function createUser(array $data)
    {
        return User::create(
            [
                'name'     => $data['name'],
                'email'    => $data['email'],
                'password' => Hash::make($data['password']),
            ]
        );
    }

    /**
     * Create an info for the created user.
     *
     * @param int   $userId
     * @param array $data
     */
    protected function createUserInfo($userId, $data)
    {
        UserInfo::create(
            [
                'user_id'         => $userId,
                'email'           => $data['email'],
                'second_name'     => $data['second_name'],
                'phone'           => $data['phone'],
                'discount_agreed' => (int)$data['discount_agreed'],
                'events_agreed'   => (int)$data['events_agreed'],
            ]
        );
    }

    /**
     * @param string $username
     * @param string $email
     * @param string $verifyCode
     *
     * @return JsonResponse
     */
    protected function sendVerifyEmail($username, $email, $verifyCode)
    {
        try {
            Mail::send(new UserVerify($username, $email, $verifyCode));

            return response()->json(['message' => 'verify email has sent']);
        } catch (\Exception $exception) {
            Log::error('Error sending UserVerify mail: ' . $exception->getMessage());

            return response()->json(['error' => 'wrong data'], 401);
        }
    }
}
