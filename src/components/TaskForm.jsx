import React, { useState } from 'react';
import { Plus, Calendar, Tag, AlertCircle } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function TaskForm() {
  const { addTask } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Trabalho');
  const [priority, setPriority] = useState('Média');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({ title, category, priority, dueDate });
    setTitle('');
    setDueDate('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-4 px-6 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 hover:border-primary-400 hover:text-primary-500 transition-all flex items-center justify-center gap-2 group"
      >
        <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="font-semibold">Adicionar nova tarefa</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
      <input
        autoFocus
        type="text"
        placeholder="O que precisa ser feito?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-lg font-semibold text-gray-900 placeholder:text-gray-300 border-none focus:ring-0 p-0 mb-6 bg-transparent"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block flex items-center gap-1">
            <Tag className="w-3 h-3" /> Categoria
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all py-2 px-3"
          >
            <option>Trabalho</option>
            <option>Pessoal</option>
            <option>Estudos</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Prioridade
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all py-2 px-3"
          >
            <option>Alta</option>
            <option>Média</option>
            <option>Baixa</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Prazo
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all py-2 px-3"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-6 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 shadow-md shadow-primary-200 transition-all active:scale-95"
        >
          Salvar Tarefa
        </button>
      </div>
    </form>
  );
}
