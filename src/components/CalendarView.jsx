import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../context/TaskContext';

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const categoryColors = {
  Trabalho: 'bg-amber-400',
  Pessoal: 'bg-emerald-400',
  Estudos: 'bg-sky-400',
};

const priorityDotColors = {
  Alta: 'bg-rose-500',
  Média: 'bg-orange-400',
  Baixa: 'bg-slate-400',
};

function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];

  const startPad = firstDay.getDay();

  for (let i = 0; i < startPad; i++) {
    days.push(null);
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  return days;
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

export default function CalendarView() {
  const { allTasks } = useTasks();
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);

  const days = useMemo(() => getMonthDays(currentYear, currentMonth), [currentYear, currentMonth]);

  const tasksByDate = useMemo(() => {
    const map = {};
    allTasks.forEach(task => {
      if (task.dueDate) {
        const key = task.dueDate;
        if (!map[key]) map[key] = [];
        map[key].push(task);
      }
    });
    return map;
  }, [allTasks]);

  const selectedTasks = useMemo(() => {
    const key = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    return allTasks.filter(task => task.dueDate === key);
  }, [allTasks, selectedDate]);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const goToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(today);
  };

  const formatDate = (date) => {
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Calendário</h1>
        <p className="text-gray-500 mt-1">Visualize suas tarefas por data.</p>
      </header>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 min-w-[180px] text-center">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500 hover:text-gray-700"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={goToday}
            className="px-4 py-2 text-sm font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-xl transition-colors"
          >
            Hoje
          </button>
        </div>

        <div className="grid grid-cols-7 px-6 gap-1">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 p-6 pt-2 gap-1">
          {days.map((date, idx) => {
            if (!date) {
              return <div key={`empty-${idx}`} />;
            }

            const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            const dayTasks = tasksByDate[dateKey] || [];
            const isToday = isSameDay(date, today);
            const isSelected = isSameDay(date, selectedDate);
            const isOtherMonth = date.getMonth() !== currentMonth;

            return (
              <button
                key={dateKey}
                onClick={() => setSelectedDate(date)}
                className={`relative flex flex-col items-center pt-2 pb-1.5 rounded-xl transition-all min-h-[64px] ${
                  isSelected
                    ? 'bg-primary-50 ring-2 ring-primary-500'
                    : isToday
                      ? 'bg-amber-50'
                      : 'hover:bg-gray-50'
                } ${isOtherMonth ? 'opacity-30' : ''}`}
              >
                <span className={`text-sm font-semibold leading-none mb-1.5 ${
                  isToday && !isSelected
                    ? 'text-amber-600'
                    : isSelected
                      ? 'text-primary-700'
                      : 'text-gray-700'
                }`}>
                  {date.getDate()}
                </span>
                {dayTasks.length > 0 && (
                  <div className="flex gap-0.5 flex-wrap justify-center">
                    {dayTasks.slice(0, 3).map(task => (
                      <div
                        key={task.id}
                        className={`w-1.5 h-1.5 rounded-full ${categoryColors[task.category] || 'bg-gray-300'}`}
                      />
                    ))}
                    {dayTasks.length > 3 && (
                      <span className="text-[9px] font-bold text-gray-400 leading-none">+{dayTasks.length - 3}</span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDate.toISOString()}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-bold text-gray-900">
                {formatDate(selectedDate)}
              </h3>
              {isSameDay(selectedDate, today) && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                  Hoje
                </span>
              )}
            </div>
            <span className="text-sm text-gray-400 font-medium">
              {selectedTasks.length} {selectedTasks.length === 1 ? 'tarefa' : 'tarefas'}
            </span>
          </div>

          {selectedTasks.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">
              Nenhuma tarefa para esta data.
            </p>
          ) : (
            <div className="space-y-2">
              {selectedTasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <div className={`w-2 h-2 rounded-full ${priorityDotColors[task.priority] || 'bg-slate-400'}`} />
                  <span className={`flex-1 text-sm font-semibold text-gray-900 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                    {task.title}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                    task.completed
                      ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                      : 'bg-gray-100 text-gray-600 border-gray-200'
                  }`}>
                    {task.completed ? 'Feito' : task.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
