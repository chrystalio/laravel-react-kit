<?php

namespace App\Models;

use Database\Factories\TaskFactory;
use Illuminate\Console\Concerns\InteractsWithIO;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Task extends Model implements HasMedia
{
    /** @use HasFactory<TaskFactory> */
    use HasFactory;
    use InteractsWithMedia;

    protected $fillable = [
        'name',
        'is_completed',
        'due_date'
    ];

    protected $appends = [
        'mediaFile'
    ];

    protected function cast(): array
    {
        return [
            'is_completed' => 'boolean',
            'due_date' => 'date'
        ];
    }

    public function getMediaFileAttribute() {
        if ($this->relationLoaded('media')) {
            return $this->getFirstMedia();
        }

        return null;
    }
}
