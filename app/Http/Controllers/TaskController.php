<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Models\TaskCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\TaskCategoryController;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    return Inertia::render('tasks/index', [
        'tasks' => Task::query()
            ->with(['media', 'taskCategories'])
            ->when($request->has('categories'), function ($query) use ($request) {
                $query->whereHas('taskCategories', function ($query) use ($request) {
                    $query->whereIn('id', $request->query('categories'));
                });
            })
            ->paginate(10)
            ->withQueryString(),
        'categories' => TaskCategory::whereHas('tasks')->withCount('tasks')->get(),
        'selectedCategories' => $request->query('categories'),
    ]);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('tasks/create', [
            'categories' => TaskCategory::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request): RedirectResponse
    {
        /** @var \Illuminate\Http\Request $request */
        $task = Task::create($request->safe(['name', 'due_date']) + ['is_completed' => false]);

        if ($request->hasFile('media')) {
            $task->addMedia($request->file('media'))->toMediaCollection();
        }

        if ($request->has('categories')) {
            $task->taskCategories()->sync($request->validated('categories'));
        }

        return redirect()->route('tasks.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task): Response
    {
        $task->load(['media', 'TaskCategories']);
        $task->append('mediaFile');

        return Inertia::render('tasks/edit', [
            'task' => $task,
            'categories' => TaskCategory::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task): RedirectResponse
    {
        $task->update($request->validated());

        /** @var \Illuminate\Http\Request $request */
        if ($request->hasFile('media')) {
            $task->getFirstMedia()?->delete();
            $task->addMedia($request->file('media'))->toMediaCollection();
        }

        $task->taskCategories()->sync($request->validated('categories', []));

        return redirect()->route('tasks.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task): RedirectResponse
    {

        $task->taskCategories()->detach();
        $task->delete();

        return redirect()->route('tasks.index');
    }
}
