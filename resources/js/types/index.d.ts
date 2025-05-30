import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface Task {
    id: number;
    name: string;
    is_completed: boolean;
    due_date?: string;
    mediaFile?: MediaFile;
    task_categories: TaskCategory[];
    created_at: string;
    updated_at: string;
}

export interface TaskCategory {
    id: number;
    name: string;
    tasks_count: number | null;
    tasks: Task[] | null;
    created_at: string;
    updated_at: string;
}

export interface CreateTaskForm {
    name: string;
    due_date?: string;
    media?: File | null;
    categories?: string[];
}

export interface EditTaskForm {
    name: string;
    is_completed: boolean;
    due_date?: string;
    media?: File | null;
    [key: string]: FormDataConvertible;
    categories?: string[];
}

export interface TaskChartData {
    status: string;
    count: number;
    fill: string;
}

export interface StatCardProps {
    title: string;
    value: number;
    icon?: React.ReactNode;
};

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface PaginatedResponse<T = Task | TaskCategory | null> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface MediaFile {
    id: number,
    model_type: string,
    model_id: number,
    uuid: string,
    collection_name: string,
    name: string,
    file_name: string,
    mime_type: string,
    disk: string,
    conversions_disk: string,
    size: number,
    manipulations: string[],
    custom_properties: string[],
    generated_conversions: string[],
    responsive_images: string[],
    order_column: number,
    created_at: string,
    updated_at: string,
    original_url: string,
    preview_url: string,
}
