import { useEffect, useMemo, useState } from 'react';
import { tasksApi, type TaskFilters } from '../../api/tasks.api';
import type { Task } from '../../types';

const defaultFilters: TaskFilters = {
  status: '',
  priority: '',
  search: '',
  assignedToId: '',
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async (nextFilters = filters) => {
    setIsLoading(true);
    const cleanFilters = Object.fromEntries(
      Object.entries(nextFilters).filter(([, value]) => value !== '')
    );
    const response = await tasksApi.list(cleanFilters);
    setTasks(response);
    setIsLoading(false);
  };

  useEffect(() => {
    void fetchTasks(filters);
  }, [filters.status, filters.priority, filters.assignedToId]);

  const filteredTasks = useMemo(() => {
    if (!filters.search) return tasks;
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(filters.search?.toLowerCase() ?? '')
    );
  }, [filters.search, tasks]);

  return {
    tasks: filteredTasks,
    rawTasks: tasks,
    filters,
    setFilters,
    isLoading,
    fetchTasks,
  };
}
