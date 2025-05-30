<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TaskCategoryController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::controller(DashboardController::class)->prefix('dashboard')->group(function () {
        Route::get('task-status', 'getTaskStatusDistribution');
        Route::get('stats', 'getStatsSummary');
    });

    Route::resource('tasks', TaskController::class);
    Route::resource('task-categories', TaskCategoryController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
