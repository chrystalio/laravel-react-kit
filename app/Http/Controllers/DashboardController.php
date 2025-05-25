<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function getTaskStatusDistribution(): JsonResponse
    {
        $data = Task::selectRaw('is_completed, COUNT(*) as count')
                ->groupBy('is_completed')
                ->pluck('count', 'is_completed');

        return response()->json($data);
    }

    public function getStatsSummary(): JsonResponse
    {
        return response()->json([
            'total' => Task::count(),
            'completed' => Task::where('is_completed', true)->count(),
            'in_progress' => Task::where('is_completed', false)->count(),
            'uncategorized' => Task::doesntHave('taskCategories')->count(),
        ]);
    }
}
