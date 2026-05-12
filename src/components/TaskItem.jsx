import React from 'react';
import { Trash2, Calendar, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTasks } from '../context/TaskContext';

const categoryColors = {
  Trabalho: 'bg-amber-100 text-amber-700 border-amber-200',
  Pessoal: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Estudos: 'bg-sky-100 text-sky-700 border-sky-200',
};

const priorityColors = {
  Alta: 'bg-rose-100 text-rose-700 border-rose-200',
  Média: 'bg-orange-100 text-orange-700 border-orange-200',
  Baixa: 'bg-slate-100 text-slate-700 border-slate-200',
};

export default function TaskItem({ task }) {
  const { toggleTask, deleteTask } = useTasks();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`group bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      <button
        onClick={() => toggleTask(task.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          task.completed 
            ? 'bg-primary-600 border-primary-600 text-white' 
            : 'border-gray-300 hover:border-primary-500'
        }`}
      >
        {task.completed && <Check className="w-4 h-4 stroke-[3px]" />}
      </button>

      <div className="flex-1 min-w-0">
        <h3 className={`text-gray-900 font-semibold truncate ${task.completed ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${categoryColors[task.category] || categoryColors.Trabalho}`}>
            {task.category}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${priorityColors[task.priority] || priorityColors.Baixa}`}>
            {task.priority}
          </span>
          {task.dueDate && (
            <div className="flex items-center gap-1 text-gray-400 text-xs ml-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors md:opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </motion.div>
  );
}
