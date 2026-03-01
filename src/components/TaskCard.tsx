import React, { useState, useEffect } from 'react';
import type { BusinessTask } from '../types';
import { formatDistanceToNow, isPast } from 'date-fns';
import { Clock, Trash2, XCircle, CheckCircle2 } from 'lucide-react';

interface TaskCardProps {
    task: BusinessTask;
    onUpdate: (id: string, updates: Partial<BusinessTask>) => void;
    onDelete: (id: string) => void;
    onView: (task: BusinessTask) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete, onView }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        if (task.status !== 'pending' || !task.deadline) return;

        const updateTimer = () => {
            if (isPast(task.deadline!)) {
                setTimeLeft('Expired');
                onUpdate(task.id, { status: 'expired' });
            } else {
                setTimeLeft(formatDistanceToNow(task.deadline!, { addSuffix: true }));
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 10000);
        return () => clearInterval(interval);
    }, [task.deadline, task.status, task.id, onUpdate]);

    const StatusIcon = {
        pending: Clock,
        completed: CheckCircle2,
        cancelled: XCircle,
        expired: XCircle
    }[task.status];

    const statusColor = {
        pending: 'text-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400',
        completed: 'text-green-500 bg-green-50 dark:bg-green-900/30 dark:text-green-400',
        cancelled: 'text-gray-500 bg-gray-50 dark:bg-gray-800 dark:text-gray-400',
        expired: 'text-red-500 bg-red-50 dark:bg-red-900/30 dark:text-red-400'
    }[task.status];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-shadow relative group overflow-hidden flex flex-col h-full">
            <div
                className="absolute inset-0 z-0 cursor-pointer"
                onClick={() => onView(task)}
            ></div>

            <div className="relative z-10 flex justify-between items-start mb-3 pointer-events-none">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg line-clamp-1 pr-4" title={task.title}>{task.title}</h3>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shrink-0 ${statusColor}`}>
                    <StatusIcon size={14} />
                    <span className="capitalize">{task.status}</span>
                </span>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 relative z-10 pointer-events-none flex-grow">
                {task.description}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-gray-700/50 relative z-10">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {task.status === 'pending' && task.deadline ? (
                        <span className={task.deadline && isPast(task.deadline) ? 'text-red-500 dark:text-red-400' : 'text-blue-600 dark:text-blue-400 font-bold'}>
                            ⏳ {timeLeft || 'Calculating...'}
                        </span>
                    ) : (
                        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                    )}
                </div>

                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {task.status === 'pending' && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onUpdate(task.id, { status: 'cancelled' }); }}
                            className="p-1.5 text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-lg transition-colors bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700"
                            title="Cancel Task"
                        >
                            <XCircle size={16} />
                        </button>
                    )}
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
                        className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700"
                        title="Delete Task"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};
