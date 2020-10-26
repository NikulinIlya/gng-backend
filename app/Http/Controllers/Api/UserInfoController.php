<?php

namespace App\Http\Controllers\Api;

use App\Models\UserInfo;
use Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Validator;

class UserInfoController
{
    /**
     * @param Request $request
     *
     * @return mixed
     */
    public function show(Request $request)
    {
        $userInfo = $request->user()->userInfo()->first();
        $userInfo['name'] = $request->user()->name;

        return $userInfo;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
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
            'name' => ['string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response()
                ->json([
                    $validator->errors(),
                ], 422);
        }

        $userInfo = UserInfo::where('user_id', Auth::id())->first();

        if ($userInfo) {
            if ($request->filled('second_name')) {
                $userInfo->second_name = $request->second_name;
            }
            if ($request->filled('patronymic')) {
                $userInfo->patronymic = $request->patronymic;
            }
            if ($request->filled('phone')) {
                $userInfo->phone = $request->phone;
            }
            if ($request->filled('gender')) {
                $userInfo->gender = $request->gender;
            }
            if ($request->filled('discount_agreed')) {
                $userInfo->discount_agreed = $request->discount_agreed;
            }
            if ($request->filled('events_agreed')) {
                $userInfo->events_agreed = $request->events_agreed;
            }
            if ($request->filled('birthday')) {
                $userInfo->birthday = $request->birthday;
            }

            if ($request->filled('name')) {
                $user = $request->user();
                $user->name = $request->name;
                $user->save();
            }

            $userInfo->save();

            return new JsonResponse(['message' => 'Update completed.']);
        } else {
            return new JsonResponse(['error' => 'wrong data'], 401);
        }
    }
}
