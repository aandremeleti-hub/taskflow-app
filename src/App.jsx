import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Analytics from './components/Analytics';
import CalendarView from './components/CalendarView';

function App() {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <TaskProvider>
      <div className="min-h-screen bg-[#F9FAFB]">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:py-12">
          {activeTab === 'tasks' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <header>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Minhas Tarefas</h1>
                <p className="text-gray-500 mt-1">Organize seu dia e alcance seus objetivos.</p>
              </header>
              
              <TaskForm />
              <TaskList />
            </div>
          )}

          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'calendar' && <CalendarView />}
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;
