import { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import StatCard from '@/components/dashboard/stat-card';
import { CheckCircle, Clock, ListChecks, FileQuestion } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [stats, setStats] = useState({ total: 0, completed: 0, in_progress: 0, uncategorized: 0, });

    useEffect(() => {
        axios.get('/dashboard/stats').then(res => setStats(res.data));
      }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid gap-2 md:grid-cols-4 items-start">
                    <StatCard title="Uncategorized" value={stats.uncategorized} icon={<FileQuestion className="text-muted-foreground h-5 w-5" />} />
                    <StatCard title="Total Tasks" value={stats.total} icon={<ListChecks className="text-muted-foreground h-5 w-5" />} />
                    <StatCard title="In Progress" value={stats.in_progress} icon={<Clock className="text-muted-foreground h-5 w-5" />} />
                    <StatCard title="Completed" value={stats.completed} icon={<CheckCircle className="text-muted-foreground h-5 w-5" />} />
                </div>
            </div>
        </AppLayout>
    );
}
