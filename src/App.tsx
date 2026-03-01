import { useState } from 'react';
import { Layout } from './components/Layout';
import { useTaskManager } from './hooks/useTaskManager';
import { CreateTask } from './components/CreateTask';
import { Dashboard } from './components/Dashboard';
import { HistoryView } from './components/HistoryView';
import { TaskDetail } from './components/TaskDetail';
import { SettingsModal } from './components/SettingsModal';
import type { BusinessTask } from './types';

function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'create' | 'history' | 'detail'>('dashboard');
  const [selectedTask, setSelectedTask] = useState<BusinessTask | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const taskManager = useTaskManager();

  const handleViewTask = (task: BusinessTask) => {
    setSelectedTask(task);
    setActiveView('detail');
  };

  const handleNavigate = (view: 'dashboard' | 'create' | 'history') => {
    setSelectedTask(null);
    setActiveView(view);
  };

  const handleImport = (taskProps: any) => {
    taskManager.addTask(taskProps);
    setActiveView('dashboard');
  };

  return (
    <>
      <Layout
        activeView={activeView === 'detail' ? 'dashboard' : activeView}
        onNavigate={handleNavigate}
        onOpenSettings={() => setIsSettingsOpen(true)}
      >
        {activeView === 'create' && <CreateTask onSave={(task: any) => { taskManager.addTask(task); setActiveView('dashboard'); }} />}
        {activeView === 'dashboard' && <Dashboard tasks={taskManager.tasks} onUpdate={taskManager.updateTask} onDelete={taskManager.deleteTask} onView={handleViewTask} onImport={handleImport} />}
        {activeView === 'history' && <HistoryView tasks={taskManager.tasks} onUpdate={taskManager.updateTask} onDelete={taskManager.deleteTask} onView={handleViewTask} />}
        {activeView === 'detail' && selectedTask && (
          <TaskDetail
            task={selectedTask}
            onUpdate={(id, updates) => {
              taskManager.updateTask(id, updates);
              setSelectedTask({ ...selectedTask, ...updates });
            }}
            onBack={() => { setSelectedTask(null); setActiveView('dashboard'); }}
          />
        )}
      </Layout>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onClearData={taskManager.clearTasks}
      />
    </>
  );
}
export default App;
