import React, { useState } from 'react';
import type { BusinessTask } from '../types';
import { TaskCard } from './TaskCard';
import { Activity, CheckCircle2, AlertCircle, Upload, X } from 'lucide-react';
import { MarkdownViewer } from './MarkdownViewer';

interface DashboardProps {
    tasks: BusinessTask[];
    onUpdate: (id: string, updates: Partial<BusinessTask>) => void;
    onDelete: (id: string) => void;
    onView: (task: BusinessTask) => void;
    onImport: (task: Omit<BusinessTask, 'id' | 'createdAt' | 'status' | 'evaluation'>) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ tasks, onUpdate, onDelete, onView, onImport }) => {
    const [importCandidate, setImportCandidate] = useState<Omit<BusinessTask, 'id' | 'createdAt' | 'status' | 'evaluation'> | null>(null);
    const activeTasks = tasks.filter(t => t.status === 'pending');
    const completedCount = tasks.filter(t => t.status === 'completed').length;

    const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+/;
            const match = content.match(frontmatterRegex);
            
            if (match) {
                const frontmatter = match[1];
                const body = content.slice(match[0].length).replace(/^\\s*[\\r\\n]/, '').trimEnd();
                const titleMatch = frontmatter.match(/title:\s*(.+)/);
                setImportCandidate({ title: titleMatch ? titleMatch[1].trim() : 'Imported Logic Task', description: body, deadline: null });
            } else {
                const h1Regex = /^#\s+(.+)/;
                const titleMatch = content.match(h1Regex);
                let title = 'Imported Logic Task';
                if (titleMatch) {
                    title = titleMatch[1].trim();
                }
                setImportCandidate({ title, description: content, deadline: null });
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    const confirmImport = () => {
        if (importCandidate) {
            onImport(importCandidate);
            setImportCandidate(null);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <StatCard title="Active Logic Tasks" value={activeTasks.length} icon={<Activity size={24} className="text-blue-600" />} />
                <StatCard title="Completed" value={completedCount} icon={<CheckCircle2 size={24} className="text-green-600" />} />
                <StatCard title="Total Tracked" value={tasks.length} icon={<AlertCircle size={24} className="text-purple-600" />} />
            </div>

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Active Business Logic</h2>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-all border border-blue-100 dark:border-blue-800 shadow-sm active:scale-95">
                    <Upload size={16} />
                    Import MD
                    <input type="file" accept=".md" className="hidden" onChange={handleFileImport} />
                </label>
            </div>

            {activeTasks.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">No active tasks. Create one to get started!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {activeTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            onView={onView}
                        />
                    ))}
                </div>
            )}

            {importCandidate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 dark:bg-gray-900/80 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Preview Import</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Review the logic task before adding it to your board</p>
                            </div>
                            <button onClick={() => setImportCandidate(null)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1 bg-white dark:bg-gray-800">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">{importCandidate.title}</h2>
                            <MarkdownViewer content={importCandidate.description} />
                        </div>

                        <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-end gap-3">
                            <button
                                onClick={() => setImportCandidate(null)}
                                className="px-6 py-2.5 rounded-xl font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmImport}
                                className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm active:scale-95 flex items-center gap-2"
                            >
                                <Upload size={18} />
                                Confirm Import
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
            <h4 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h4>
        </div>
        <div className="p-3.5 bg-gray-50 dark:bg-gray-900 rounded-xl">
            {icon}
        </div>
    </div>
);
