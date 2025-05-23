import AppLayout from "@/layouts/app-layout";
import { Head, router, useForm } from '@inertiajs/react'
import { FormEventHandler, useRef } from "react";
import { type EditTaskForm, type Task, type BreadcrumbItem, type TaskCategory } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import InputError from "@/components/input-error";
import { format } from "date-fns";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tasks', href: '/tasks' },
    { title: 'Edit', href: ' ' }
]

export default function Edit({ task, categories }: { task: Task, categories: TaskCategory[] }) {
    const taskName = useRef<HTMLInputElement>(null);

    const {data, setData, errors, reset, processing, progress } = useForm<EditTaskForm>({
        name: task.name,
        due_date: task.due_date,
        is_completed: task.is_completed,
        media: null,
        categories: task.task_categories.map((category) => category.id.toString()),
    });

    const editTask: FormEventHandler = (e) => {
        e.preventDefault();

        router.post(
            route('tasks.update', task.id),
            { ...data, _method: 'PUT'},
            {
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
            }
        )
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Task" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={editTask} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Task Name</Label>
                        <Input id="name" ref={taskName} value={data.name} onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-full"/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="due_date">Due Date</Label>

                        <Input id="due_date" value={data.due_date ? format(data.due_date, 'yyyy-MM-dd') : ''} onChange={(e) => setData('due_date', format(new Date(e.target.value), 'yyyy-MM-dd'))} className="mt-1 block w-full" type="date" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="is_completed">Completed?</Label>
                        <Switch checked={data.is_completed} onCheckedChange={() => setData('is_completed', !data.is_completed)} />

                        <InputError message={errors.is_completed} />
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

                            <InputError message={errors.is_completed} />

                            {!task.mediaFile ? '' : (
                                <a href={task.mediaFile.original_url} target="_blank" className="my-4 mx-4">
                                    <img src={task.mediaFile.original_url} className={'w-32 h-32 rounded-sm'} alt="img" />
                                </a>
                            )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="category">Categories</Label>

                        <ToggleGroup type="multiple" variant={'outline'} size={'lg'} value={data.categories}
                                    onValueChange={(value) => setData('categories', value)}>
                            {categories.map((category) => (
                                <ToggleGroupItem key={category.id} value={category.id.toString()}>
                                     <span className="px-2 text-sm leading-relaxed">{category.name}</span>
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>

                        <InputError message={errors.due_date} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>
                            Update Task
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    )
};
