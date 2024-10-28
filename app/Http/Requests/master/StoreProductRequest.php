<?php

namespace App\Http\Requests\master;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreProductRequest extends FormRequest
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
            'nama_produk' => 'required|string|max:100',
            'deskripsi' => 'nullable|string',
            'harga' => 'required|numeric|min:0', 
            'stok' => 'required|integer|min:0', 
            'berat_rata_rata' => 'nullable|numeric',
            'ukuran_ayam' => 'nullable|in:kecil,sedang,besar', 
            'bagian_ayam' => 'nullable|in:utuh,dada,paha,sayap',
            'tanggal_masuk' => 'nullable|date',
            'tanggal_kadaluarsa' => 'nullable|date',
            'umur_ayam' => 'nullable|string|max:30', 
            'cara_pembuatan' => 'nullable|in:fresh chilled,frozen,olahan',
            'sertifikat' => 'nullable|string|max:100',
            'diskon' => 'nullable|numeric|min:0|max:100',
            'tanggal_produksi' => 'nullable|date',
            'is_promo' => 'nullable|boolean',
        ];
    }

    /**
     * Summary of failedValidation
     * @param \Illuminate\Contracts\Validation\Validator $validator
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     * @return never
     */
    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([

            'success' => false,

            'message' => 'Validation errors',

            'data' => $validator->errors(),

        ]));
    }
}
