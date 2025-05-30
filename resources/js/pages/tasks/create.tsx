import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { type CreateTaskForm, type BreadcrumbItem, type TaskCategory } from '@/types';

import { FormEventHandler, useRef } from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tasks', href: '/tasks' },
    { title: 'Create', href: ' ' }
]

export default function Create({ categories }: { categories: TaskCategory[] }) {
    const taskName = useRef<HTMLInputElement>(null);

    const {data, setData, errors, post, reset, processing, progress } = useForm<Required<CreateTaskForm>>({
        name: '',
        due_date: '',
        media: null,
        categories: []
    })

    const createTask: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('tasks.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                    taskName.current?.focus();
                }
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Task" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form className="space-y-6" onSubmit={createTask}>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Task Name *</Label>

                        <Input id="name" ref={taskName} value={data.name} onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-full" />

                        <InputError message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="due_date">Due Date</Label>

                        <Input id="due_date" value={data.due_date} onChange={(e) => setData(
                            'due_date',
                            format(new Date(e.target.value), 'yyyy-MM-dd'))}
                            className="mt-1 block w-full" type="date" />

                        <InputError message={errors.due_date} />
                    </div>

                    <div className="grid gap-2">
                            <Label htmlFor="media">Media</Label>
                            <Input id="media"type="file" className="mt-1 block w-full"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] ?? null;
                                    setData('media', file);
                                }}
                            />
                            {progress && (
                                <progress value={progress.percentage} max="100">
                                    {progress.percentage}%
                                </progress>
                            )}

                            <InputError message={errors.media} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="category">Categories</Label>
                            <ToggleGroup type="multiple" variant={'outline'} size={'lg'} value={data.categories}        onValueChange={(value) => setData('categories', value)}>
                                {categories.map((category) => (
                                    <ToggleGroupItem key={category.id} value={category.id.toString()}>
                                          <span className="px-2 text-sm leading-relaxed">{category.name}</span>
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>

                            <InputError message={errors.categories} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Create Task</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
