<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /**
     * Handle a registration request for the application.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
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
            return response()
                ->json(
                    [
                        'error' => 'wrong data',
                    ],
                    422
                );
        }

        $user = $this->create($request->all());

        return new JsonResponse(['token' => $user->createToken('authToken')->plainTextToken], 201);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param array $data
     *
     * @return User
     */
    protected function create(array $data)
    {
        $user = User::create(
            [
                'name'     => $data['name'],
                'email'    => $data['email'],
                'password' => Hash::make($data['password']),
            ]
        );

        if ($user) {
            UserInfo::create(
                [
                    'user_id'         => $user->id,
                    'email'           => $data['email'],
                    'second_name'     => $data['second_name'],
                    'phone'           => $data['phone'],
                    'discount_agreed' => (int) $data['discount_agreed'],
                    'events_agreed'   => (int) $data['events_agreed'],
                ]
            );
        }

        return $user;
    }
}
