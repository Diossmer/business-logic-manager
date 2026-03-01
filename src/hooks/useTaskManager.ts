import { useState, useEffect } from 'react';
import type { BusinessTask } from '../types';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'business_tasks';

export function useTaskManager() {
    const [tasks, setTasks] = useState<BusinessTask[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse tasks", e);
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    // Hook to check for expirations
    useEffect(() => {
        const interval = setInterval(() => {
            setTasks(currentTasks => {
                let hasChanges = false;
                const now = Date.now();

                const updatedTasks = currentTasks.map(t => {
                    if (t.status === 'pending' && t.deadline && now >= t.deadline) {
                        hasChanges = true;
                        return { ...t, status: 'expired' as const };
                    }
                    return t;
                });

                return hasChanges ? updatedTasks : currentTasks;
            });
        }, 10000); // Check every 10 seconds

        return () => clearInterval(interval);
    }, []);

    const addTask = (taskProps: Omit<BusinessTask, 'id' | 'createdAt' | 'status' | 'evaluation'>) => {
        const newTask: BusinessTask = {
            ...taskProps,
            id: uuidv4(),
            createdAt: Date.now(),
            status: 'pending',
            evaluation: []
        };
        setTasks(prev => [newTask, ...prev]);
    };

    const updateTask = (id: string, updates: Partial<BusinessTask>) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const clearTasks = () => {
        setTasks([]);
    };

    return { tasks, addTask, updateTask, deleteTask, clearTasks };
}
