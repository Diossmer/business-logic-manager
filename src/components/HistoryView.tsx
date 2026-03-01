import React, { useState } from 'react';
import type { BusinessTask } from '../types';
import { TaskCard } from './TaskCard';
import { Search, Filter } from 'lucide-react';

interface HistoryViewProps {
    tasks: BusinessTask[];
    onUpdate: (id: string, updates: Partial<BusinessTask>) => void;
    onDelete: (id: string) => void;
    onView: (task: BusinessTask) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ tasks, onUpdate, onDelete, onView }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'cancelled' | 'expired'>('all');

    const filteredTasks = tasks.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || t.status === filter;
        return matchesSearch && matchesFilter;
    }).sort((a, b) => b.createdAt - a.createdAt); // newest first

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search business logic history..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-48">
                        <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <select
                            className="w-full pl-9 pr-8 border border-gray-200 dark:border-gray-700 rounded-lg py-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 appearance-none transition-all cursor-pointer"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as any)}
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="expired">Expired</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        onView={onView}
                    />
                ))}
                {filteredTasks.length === 0 && (
                    <div className="col-span-full text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                        <p className="text-gray-500 dark:text-gray-400">No matching business logic tasks found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
