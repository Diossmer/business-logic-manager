import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon, Monitor } from 'lucide-react';

export const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-full">
            <button
                onClick={() => setTheme('light')}
                className={`flex-1 flex justify-center items-center py-2 rounded-md transition-all ${theme === 'light'
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                    }`}
            >
                <Sun size={18} />
            </button>
            <button
                onClick={() => setTheme('system')}
                className={`flex-1 flex justify-center items-center py-2 rounded-md transition-all ${theme === 'system'
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                    }`}
            >
                <Monitor size={18} />
            </button>
            <button
                onClick={() => setTheme('dark')}
                className={`flex-1 flex justify-center items-center py-2 rounded-md transition-all ${theme === 'dark'
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                    }`}
            >
                <Moon size={18} />
            </button>
        </div>
    );
};
