import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';

export default function TaskList() {
  const { tasks, filter, setFilter, stats } = useTasks();

  const filters = ['Todas', 'Pendentes', 'Concluídas'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                filter === f
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-100'
                  : 'bg-white text-gray-500 border border-gray-100 hover:border-primary-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        
        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest flex gap-4">
          <span>{stats.pending} Pendentes</span>
          <span>{stats.completed} Concluídas</span>
        </div>
      </div>

      <div className="space-y-3 min-h-[300px]">
        <AnimatePresence mode="popLayout">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <ClipboardList className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium text-gray-500">Nenhuma tarefa encontrada</p>
              <p className="text-sm">Que tal adicionar uma agora mesmo?</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
