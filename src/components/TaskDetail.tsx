import React from 'react';
import { MarkdownViewer } from './MarkdownViewer';
import type { BusinessTask } from '../types';
import { ArrowLeft, Check, Download } from 'lucide-react';

interface TaskDetailProps {
    task: BusinessTask;
    onUpdate: (id: string, updates: Partial<BusinessTask>) => void;
    onBack: () => void;
}

const EVALUATION_CRITERIA = [
    { id: 'responsive', label: 'Responsive Design Integration', weight: 20 },
    { id: 'logic', label: 'Business Logic Accuracy', weight: 30 },
    { id: 'uiux', label: 'Minimalist UI/UX Metrics', weight: 25 },
    { id: 'architecture', label: 'Architecture & State', weight: 25 },
];

export const TaskDetail: React.FC<TaskDetailProps> = ({ task, onUpdate, onBack }) => {
    const currentEvaluations = task.evaluation || [];

    const handleScoreChange = (criterionId: string, score: number) => {
        let newEvals = [...currentEvaluations];
        const idx = newEvals.findIndex(e => e.criterion === criterionId);
        const criterion = EVALUATION_CRITERIA.find(c => c.id === criterionId)!;

        if (idx >= 0) {
            newEvals[idx].score = score;
        } else {
            newEvals.push({ id: criterionId, criterion: criterionId, score, weight: criterion.weight });
        }
        onUpdate(task.id, { evaluation: newEvals });
    };

    const getScore = (criterionId: string) => {
        return currentEvaluations.find(e => e.criterion === criterionId)?.score || 0;
    };

    const totalScore = EVALUATION_CRITERIA.reduce((acc, c) => {
        const score = getScore(c.id);
        return acc + (score * (c.weight / 100));
    }, 0);

    const exportMarkdown = () => {
        const mdContent = `---
id: ${task.id}
title: ${task.title}
createdAt: ${task.createdAt}
deadline: ${task.deadline || 'None'}
status: ${task.status}
score: ${totalScore.toFixed(0)}%
---

${task.description}
`;
        const blob = new Blob([mdContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `logic-task-${task.id.substring(0, 6)}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-4">
                <button onClick={onBack} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                    <ArrowLeft size={18} />
                    Back
                </button>
                <button onClick={exportMarkdown} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-colors font-medium shadow-sm">
                    <Download size={18} className="text-blue-600 dark:text-blue-400" />
                    Export Breakdown (MD)
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">{task.title}</h2>
                            <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                <span className="flex items-center gap-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 rounded-md">Status: <span className="text-gray-900 dark:text-gray-100 capitalize">{task.status}</span></span>
                                {task.deadline && <span className="flex items-center gap-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 rounded-md">Deadline: {new Date(task.deadline).toLocaleString()}</span>}
                            </div>
                        </div>
                        {task.status === 'completed' && (
                            <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full font-bold flex items-center gap-2 border border-green-200 dark:border-green-800">
                                <Check size={20} /> COMPLETED
                            </div>
                        )}
                    </div>
                </div>

                {/* Important: github-markdown-css configuration for markdown content */}
                <div className="p-6 md:p-8 overflow-x-auto bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                    <MarkdownViewer content={task.description} />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-gray-700">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Evaluation Metrics</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Measure web/mobile application creation techniques.</p>
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 px-5 py-3 rounded-xl">
                        <span className="text-sm text-blue-800 dark:text-blue-300 font-semibold uppercase tracking-wider">Total Score:</span>
                        <span className="text-3xl font-black text-blue-600 dark:text-blue-400">{totalScore.toFixed(0)}%</span>
                    </div>
                </div>

                <div className="space-y-8">
                    {EVALUATION_CRITERIA.map(c => (
                        <div key={c.id} className="group">
                            <div className="flex justify-between mb-3">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{c.label} <span className="text-gray-400 dark:text-gray-500 font-normal">(Weight: {c.weight}%)</span></label>
                                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{getScore(c.id)} <span className="text-gray-400 dark:text-gray-500 font-normal">/ 100</span></span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={getScore(c.id)}
                                onChange={(e) => handleScoreChange(c.id, parseInt(e.target.value))}
                                className="w-full h-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border border-gray-200 dark:border-gray-600"
                            />
                        </div>
                    ))}
                </div>

                {totalScore === 100 && task.status !== 'completed' && (
                    <div className="mt-8 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 px-5 py-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-bottom-2">
                        <div className="p-2 bg-green-100 dark:bg-green-800 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                            <Check size={16} className="text-green-700 dark:text-green-400" />
                        </div>
                        <span className="font-medium">Perfect completion! All metrics achieved. The business logic has been successfully implemented.</span>
                    </div>
                )}

                {task.status !== 'completed' && task.status !== 'expired' && (
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={() => onUpdate(task.id, { status: 'completed' })}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2 hover:shadow-md active:scale-95"
                        >
                            <Check size={20} />
                            Mark Logic as Completed
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
