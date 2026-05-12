import React from 'react';
import { useTasks } from '../context/TaskContext';
import { motion } from 'framer-motion';

export default function Analytics() {
  const { stats } = useTasks();
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">Análise de Desempenho</h2>
        <p className="text-gray-500">Acompanhe sua produtividade e conclusão de tarefas.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total de Tarefas', value: stats.total, color: 'text-primary-600' },
          { label: 'Concluídas', value: stats.completed, color: 'text-emerald-600' },
          { label: 'Taxa de Conclusão', value: `${completionRate}%`, color: 'text-amber-600' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
            <p className={`text-3xl font-black ${item.color}`}>{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-6">Progresso Geral</h3>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-primary-600 rounded-full"
          />
        </div>
        <div className="flex justify-between mt-4 text-sm font-medium text-gray-500">
          <span>0%</span>
          <span>{completionRate}% Concluído</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
