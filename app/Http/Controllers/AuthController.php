<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;

class AuthController
{
    use ValidatesRequests;

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response([
                'message' => ['These credentials do not match our records.'],
            ], 404);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return response($response, 201);
    }
}
