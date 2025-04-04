<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    // public function authorize(): bool
    // {
    //     return
    // }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255|min:5',
            'category' => 'required|exists:posts_categories,id',
            'description' => 'required|string|max:2000',

            'coordinates' => 'array|nullable|max:2',
            'coordinates.longitude' => 'nullable|numeric|between:-180,180|required_with:coordinates.latitude',
            'coordinates.latitude' => 'nullable|numeric|between:-90,90|required_with:coordinates.longitude',

            'images' => 'nullable|array|max:3',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // max:2048 is 2MB
        ];

    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'title.required' => 'A title is required',
            'body.required' => 'A message is required',
        ];
    }
}
