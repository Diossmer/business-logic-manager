import React, { useState } from 'react';
import type { BusinessTask } from '../types';
import { MarkdownViewer } from './MarkdownViewer';
import { Calendar, Clock, Save } from 'lucide-react';

interface CreateTaskProps {
    onSave: (task: Omit<BusinessTask, 'id' | 'createdAt' | 'status' | 'evaluation'>) => void;
}

export const CreateTask: React.FC<CreateTaskProps> = ({ onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        let deadline = null;
        if (date && time) {
            deadline = new Date(`${date}T${time}`).getTime();
        } else if (date) {
            deadline = new Date(`${date}T23:59:59`).getTime();
        }

        onSave({
            title,
            description,
            deadline
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Create Business Logic Task</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder="e.g., Implement Authentication Flow"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Business Logic Details (Markdown)
                        </label>
                        <textarea
                            required
                            rows={14}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono text-sm leading-relaxed bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder="## Requirements&#10;- Support JWT authentication&#10;- Add role-based access control&#10;..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="mt-8 lg:mt-0">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex justify-between">
                            <span>Live Visualization Preview</span>
                            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-800">GitHub Flavored</span>
                        </label>
                        <div className="w-full h-[330px] overflow-y-auto px-6 py-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow-inner">
                            <MarkdownViewer content={description || '*Start writing your business logic in the left panel to see the live preview here.*'} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700/50">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                            <Calendar size={16} className="text-blue-500" /> Deadline Date (Optional)
                        </label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                            <Clock size={16} className="text-blue-500" /> Deadline Time (Optional)
                        </label>
                        <input
                            type="time"
                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 color-scheme-dark"
                            value={time}
                            onChange={e => setTime(e.target.value)}
                        />
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-all hover:shadow-md active:scale-95"
                    >
                        <Save size={18} />
                        Save Task
                    </button>
                </div>
            </form>
        </div>
    );
};
