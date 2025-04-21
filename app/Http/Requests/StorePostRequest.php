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
    // [55.68, 20.5],
    // [58.1, 28.6],
    {
        return [
            'title' => 'required|string|max:255|min:5',
            'category' => 'required|exists:posts_categories,id',
            'description' => 'required|string|max:2000',

            'coordinates' => 'array|nullable|max:2',
            'coordinates.latitude' => 'nullable|numeric|between:55.68,58.1|required_with:coordinates.longitude',
            'coordinates.longitude' => 'nullable|numeric|between:20.5,28.8|required_with:coordinates.latitude',

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
