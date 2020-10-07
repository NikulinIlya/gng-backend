<?php

namespace App\Http\Controllers\Api;

use App\Models\UserInfo;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Validator;

class UserInfoController
{
    public function show(Request $request)
    {
        return $request->user()->userInfo()->get();
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'second_name' => ['string', 'max:255', 'nullable'],
            'patronymic' => ['string', 'max:255', 'nullable'],
            'phone' => ['string', 'between:11,12', 'nullable'],
            'gender' => ['string', Rule::in(['male', 'female']), 'nullable'],
            'discount_agreed' => ['boolean', 'nullable'],
            'events_agreed' => ['boolean', 'nullable'],
            'birthday' => ['integer', 'nullable'],
        ]);

        if ($validator->fails()) {
            return response()
                ->json([
                    $validator->errors(),
                ], 422);
        }

        UserInfo::where('user_id', Auth::id())
            ->update($request->input());

        return response()
            ->json([
                'message' => 'Update completed successfully',
            ], 200);
    }
}
