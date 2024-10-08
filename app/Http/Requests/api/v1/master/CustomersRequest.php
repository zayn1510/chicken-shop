<?php

namespace App\Http\Requests\api\v1\master;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CustomersRequest extends FormRequest
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
            "username"=>"string|required",
            "email" => "string|required",
            "nama_lengkap" => "|string|required|max:50",
            "phone" => "string|max:12|required",
            "alamat" => "string|required|max:200",
            "postal_kode" => "string|required|max:10",
            "password" => "string|required",
            "roles" => "integer|required"
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
