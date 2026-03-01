import React from 'react';
import { X, Trash2, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onClearData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onClearData }) => {
    const { theme, setTheme } = useTheme();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 dark:bg-gray-900/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h3>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Theme Section */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wider">Appearance</h4>
                        <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl w-full border border-gray-200 dark:border-gray-700 shadow-inner">
                            <button
                                onClick={() => setTheme('light')}
                                className={`flex-1 flex justify-center items-center py-2.5 rounded-lg transition-all ${theme === 'light'
                                        ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200/50 dark:border-gray-700/50'
                                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                    }`}
                                title="Light Mode"
                            >
                                <Sun size={18} />
                            </button>
                            <button
                                onClick={() => setTheme('system')}
                                className={`flex-1 flex justify-center items-center py-2.5 rounded-lg transition-all ${theme === 'system'
                                        ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200/50 dark:border-gray-700/50'
                                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                    }`}
                                title="Auto/System Mode"
                            >
                                <Monitor size={18} />
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`flex-1 flex justify-center items-center py-2.5 rounded-lg transition-all ${theme === 'dark'
                                        ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200/50 dark:border-gray-700/50'
                                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                    }`}
                                title="Dark Mode"
                            >
                                <Moon size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Data Section */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wider">Data Management</h4>
                        <button
                            onClick={() => {
                                if (window.confirm('Are you sure you want to delete all tasks? This cannot be undone.')) {
                                    onClearData();
                                    onClose();
                                }
                            }}
                            className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl transition-colors border border-red-100 dark:border-red-900/50 active:scale-95"
                        >
                            <span className="font-semibold">Clear All Data</span>
                            <Trash2 size={18} />
                        </button>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 px-1">
                            Deletes all logics, metrics, and history stored locally in your browser.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
