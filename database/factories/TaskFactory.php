<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $verbs = ['Fix', 'Create', 'Build', 'Design', 'Refactor', 'Implement', 'Write', 'Review', 'Deploy', 'Test'];
        $objects = [
            'authentication module',
            'CI/CD pipeline',
            'dashboard layout',
            'unit tests',
            'profile page',
            'notification system',
            'user onboarding flow',
            'database migration',
            'API endpoint for invoices',
            'error logging service',
            'dark mode toggle',
            'cron job for reports',
            'email template for welcome',
            'mobile responsive navbar',
            'role-based access control'
        ];

        $verb = fake()->randomElement($verbs);
        $object = fake()->randomElement($objects);
        $extra = fake()->optional()->randomElement([
            '',
            ' (urgent)',
            ' - needs review',
            ' for admin panel',
            ' before release',
            ' with validation',
            ' with retry logic',
            ' in production'
        ]);

        return [
            'name' => "{$verb} {$object}{$extra}",
            'is_completed' => fake()->boolean(),
            'due_date' => fake()->dateTimeBetween('now', '+2 months'),
            'created_at' => fake()->dateTimeBetween(now()->startOfWeek(), now()->endOfWeek()),
        ];
    }
}
