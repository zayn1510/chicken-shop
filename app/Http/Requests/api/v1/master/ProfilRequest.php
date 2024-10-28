<?php

namespace App\Http\Requests\api\v1\master;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
class ProfilRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "id" => "required|integer",
            "name" => "required|string",
            "email" => "required|email",
            "description" => "required|string",
            "address" => "required|string",
            "phone" => "required|string",
            "website" => "required|string",
            "logo." => "file",
            "image." => "file",
        ];
    }

    public function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            "success" => false,
            "message" => "Validation Errors",
            "data" => $validator->errors()
        ]));
    }
}
