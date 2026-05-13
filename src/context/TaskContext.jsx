import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}

export function TaskProvider({ children }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todas');

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setTasks(data.map(t => ({
          id: t.id,
          title: t.title,
          category: t.category,
          priority: t.priority,
          dueDate: t.due_date,
          completed: t.completed,
          createdAt: t.created_at
        })));
      }
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    const newTask = {
      title: task.title,
      category: task.category,
      priority: task.priority,
      due_date: task.dueDate || null,
      completed: false,
    };

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([newTask])
        .select();

      if (error) throw error;

      if (data) {
        const addedTask = {
          id: data[0].id,
          title: data[0].title,
          category: data[0].category,
          priority: data[0].priority,
          dueDate: data[0].due_date,
          completed: data[0].completed,
          createdAt: data[0].created_at
        };
        setTasks([addedTask, ...tasks]);
      }
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error.message);
    }
  };

  const toggleTask = async (id) => {
    const taskToToggle = tasks.find(t => t.id === id);
    if (!taskToToggle) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: !taskToToggle.completed })
        .eq('id', id);

      if (error) throw error;

      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error.message);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Pendentes') return !task.completed;
    if (filter === 'Concluídas') return task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  return (
    <TaskContext.Provider value={{ 
      tasks: filteredTasks, 
      allTasks: tasks,
      loading,
      addTask, 
      toggleTask, 
      deleteTask, 
      filter, 
      setFilter,
      stats
    }}>
      {children}
    </TaskContext.Provider>
  );
}
