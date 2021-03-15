<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ResetPasswordController extends Controller
{
    /**
     * Handle a login request to the application.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function reset(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'old_password'    => ['required', 'string', 'min:8'],
                'password'        => ['required', 'string', 'min:8', 'confirmed', 'different:old_password'],
            ]
        );

        if ($validator->fails()) {
            return response()->json(['error' => 'wrong data'], 422);
        }

        $user = $request->user();

        if (! $user || ! Hash::check($request->old_password, $user->password)) {
            return response()->json(['error' => 'The provided credentials are incorrect.', 401]);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message' => 'Update completed.']);
    }
}
