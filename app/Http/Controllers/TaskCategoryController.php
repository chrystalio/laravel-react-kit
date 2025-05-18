<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskCategoryRequest;
use App\Http\Requests\UpdateTaskCategoryRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\TaskCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskCategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('taskCategories/index', [
            'taskCategories' => TaskCategory::query()
                ->withCount('tasks')
                ->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('taskCategories/create');
    }

    public function store(StoreTaskCategoryRequest $request)
    {
        TaskCategory::create($request->validated());

        return redirect()->route('task-categories.index');
    }

    public function edit(TaskCategory $taskCategory)
    {
        return Inertia::render('taskCategories/edit', [
            'taskCategory' => $taskCategory,
        ]);
    }

    public function update(UpdateTaskCategoryRequest $request, TaskCategory $taskCategory)
    {
        $taskCategory->update($request->validated());

        return redirect()->route('task-categories.index');
    }

    public function destroy(TaskCategory $taskCategory)
    {
        if ($taskCategory->tasks()->count() > 0) {
            $taskCategory->tasks()->detach();
        }

        $taskCategory->delete();
        return redirect()->route('task-categories.index');
    }
}
