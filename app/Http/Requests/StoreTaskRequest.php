<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
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
     * @return array<string, string|array>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'due_date' => 'nullable|date',
            'media' => 'nullable|file|max:2048|mimes:jpg,svg,png',
            'categories' => 'nullable|array',
            'categories.*' => 'exists:task_categories,id'
        ];
    }
}
