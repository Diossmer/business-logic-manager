import React from 'react';
import { LayoutDashboard, FilePlus2, Search, Settings } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';

interface LayoutProps {
    children: React.ReactNode;
    activeView: 'dashboard' | 'create' | 'history';
    onNavigate: (view: 'dashboard' | 'create' | 'history') => void;
    onOpenSettings: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate, onOpenSettings }) => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200">
            {/* Sidebar Navigation */}
            <nav className="md:w-64 bg-white dark:bg-gray-900 shadow-sm md:shadow-md md:min-h-screen flex flex-col transition-colors duration-200">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold shadow-sm">
                        BL
                    </div>
                    <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">LogicManager</h1>
                </div>

                <div className="flex-1 px-4 py-6 space-y-2 flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
                    <NavItem
                        icon={<LayoutDashboard size={20} />}
                        label="Dashboard"
                        isActive={activeView === 'dashboard'}
                        onClick={() => onNavigate('dashboard')}
                    />
                    <NavItem
                        icon={<FilePlus2 size={20} />}
                        label="Create Task"
                        isActive={activeView === 'create'}
                        onClick={() => onNavigate('create')}
                    />
                    <NavItem
                        icon={<Search size={20} />}
                        label="History"
                        isActive={activeView === 'history'}
                        onClick={() => onNavigate('history')}
                    />
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-gray-800 hidden md:block space-y-3">
                    <ThemeSwitcher />
                    <button
                        onClick={onOpenSettings}
                        className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 w-full p-2 rounded-md transition-colors"
                    >
                        <Settings size={18} />
                        <span>Settings</span>
                    </button>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-5xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

const NavItem = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all whitespace-nowrap ${isActive
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
        >
            {icon}
            <span>{label}</span>
            {isActive && (
                <div className="hidden md:block ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.8)] dark:shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
            )}
        </button>
    );
};
