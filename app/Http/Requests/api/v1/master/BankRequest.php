<?php

namespace App\Http\Requests\api\v1\master;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
class BankRequest extends FormRequest
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
            "nama_bank" => "required|string|max:50",
            "nomor_rekening" => "required|string|max:50",
            "atas_nama" => "required|string|max:50"
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
