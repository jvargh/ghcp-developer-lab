import { FolderOpen, Users, BarChart3, LucideIcon } from "lucide-react";

export type StatColor = 'blue' | 'green' | 'purple' | 'orange';

export interface DashboardStat {
    label: string;
    value: string;
    icon: LucideIcon;
    color: StatColor;
    trend?: string;
}

export interface RecentGallery {
    id: number;
    name: string;
    type: string;
    photos: number;
    views: number;
    status: string;
    lastUpdated: string;
    clientEmail?: string;
}

/** Aggregate statistics displayed on the admin dashboard overview */
export const dashboardStats: DashboardStat[] = [
    { label: "Total Photos", value: "1,234", icon: FolderOpen, color: 'blue' },
    { label: "Active Galleries", value: "28", icon: FolderOpen, color: 'green' },
    { label: "Client Projects", value: "12", icon: Users, color: 'purple' },
    { label: "This Month Views", value: "45,678", icon: BarChart3, color: 'orange' },
];

/** Recently updated galleries for the admin panel, sorted by last updated descending */
export const recentGalleries: RecentGallery[] = [
    {
        id: 1,
        name: "Wedding - Sarah & John",
        type: "Client Review",
        photos: 156,
        views: 234,
        status: "Active",
        lastUpdated: "2024-01-20"
    },
    {
        id: 2,
        name: "Corporate Headshots",
        type: "Public",
        photos: 89,
        views: 1234,
        status: "Published",
        lastUpdated: "2024-01-19"
    },
    {
        id: 3,
        name: "Nature Portfolio",
        type: "Portfolio",
        photos: 234,
        views: 5678,
        status: "Published",
        lastUpdated: "2024-01-17"
    },
    {
        id: 4,
        name: "Street Photography",
        type: "Draft",
        photos: 67,
        views: 0,
        status: "Draft",
        lastUpdated: "2024-01-13"
    }
];