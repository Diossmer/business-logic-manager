import React, { useState } from 'react';
import { LayoutDashboard, FilePlus2, Search, Settings, ChevronLeft, Menu } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';

interface LayoutProps {
    children: React.ReactNode;
    activeView: 'dashboard' | 'create' | 'history';
    onNavigate: (view: 'dashboard' | 'create' | 'history') => void;
    onOpenSettings: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate, onOpenSettings }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200">
            {/* Sidebar Navigation */}
            <nav className={`${isSidebarOpen ? 'md:w-64' : 'md:w-20'} bg-white dark:bg-gray-900 shadow-sm md:shadow-md md:min-h-screen flex flex-col transition-all duration-300 relative`}>
                <div className={`p-6 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3 ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold shadow-sm shrink-0">
                            BL
                        </div>
                        {isSidebarOpen && <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white whitespace-nowrap">LogicManager</h1>}
                    </div>
                </div>

                <div className="flex-1 px-4 py-6 space-y-2 flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
                    <NavItem
                        icon={<LayoutDashboard size={20} />}
                        label="Dashboard"
                        isActive={activeView === 'dashboard'}
                        onClick={() => onNavigate('dashboard')}
                        isSidebarOpen={isSidebarOpen}
                    />
                    <NavItem
                        icon={<FilePlus2 size={20} />}
                        label="Create Task"
                        isActive={activeView === 'create'}
                        onClick={() => onNavigate('create')}
                        isSidebarOpen={isSidebarOpen}
                    />
                    <NavItem
                        icon={<Search size={20} />}
                        label="History"
                        isActive={activeView === 'history'}
                        onClick={() => onNavigate('history')}
                        isSidebarOpen={isSidebarOpen}
                    />
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-gray-800 hidden md:flex flex-col gap-3">
                    <div className="flex items-center justify-center">
                        <ThemeSwitcher />
                    </div>
                    <button
                        onClick={onOpenSettings}
                        className={`flex items-center ${isSidebarOpen ? 'gap-2 px-2' : 'justify-center'} text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 w-full py-2 rounded-md transition-colors`}
                        title="Settings"
                    >
                        <Settings size={20} />
                        {isSidebarOpen && <span>Settings</span>}
                    </button>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={`flex items-center ${isSidebarOpen ? 'gap-2 px-2' : 'justify-center'} text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 w-full py-2 rounded-md transition-colors mt-2`}
                        title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                    >
                        {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
                        {isSidebarOpen && <span>Collapse</span>}
                    </button>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-5xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

const NavItem = ({ icon, label, isActive, onClick, isSidebarOpen }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void, isSidebarOpen: boolean }) => {
    return (
        <button
            onClick={onClick}
            title={!isSidebarOpen ? label : undefined}
            className={`flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-2.5 rounded-lg transition-all whitespace-nowrap w-full ${isActive
                ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
        >
            <div className="shrink-0">{icon}</div>
            {isSidebarOpen && <span>{label}</span>}
            {isActive && isSidebarOpen && (
                <div className="hidden md:block ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.8)] dark:shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
            )}
        </button>
    );
};


