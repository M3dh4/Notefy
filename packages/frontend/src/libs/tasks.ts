export interface TaskItem {
  taskId: string;
  title: string;
  dueAt?: string; // ISO ms string
  completedAt?: string; // ISO ms string
  createdAt: string;
  updatedAt: string;
}

const TASKS_KEY = "notefy.tasks";

const readAll = (): TaskItem[] => {
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as TaskItem[];
  } catch {
    return [];
  }
};

const writeAll = (tasks: TaskItem[]) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

const generateId = (): string => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const listTasks = async (): Promise<TaskItem[]> => {
  return readAll().sort((a, b) => parseInt(a.completedAt || "0") - parseInt(b.completedAt || "0") || parseInt(a.dueAt || "0") - parseInt(b.dueAt || "0"));
};

export const createTask = async (title: string, dueAt?: string): Promise<TaskItem> => {
  const now = Date.now().toString();
  const task: TaskItem = { taskId: generateId(), title, dueAt, createdAt: now, updatedAt: now } as TaskItem;
  const tasks = readAll();
  tasks.unshift(task);
  writeAll(tasks);
  return task;
};

export const toggleTask = async (taskId: string): Promise<TaskItem | undefined> => {
  const tasks = readAll();
  const idx = tasks.findIndex((t) => t.taskId === taskId);
  if (idx === -1) return undefined;
  const task = tasks[idx];
  const completed = !!task.completedAt;
  const updated: TaskItem = { ...task, completedAt: completed ? undefined : Date.now().toString(), updatedAt: Date.now().toString() } as TaskItem;
  tasks[idx] = updated;
  writeAll(tasks);
  return updated;
};

export const deleteTask = async (taskId: string): Promise<boolean> => {
  const tasks = readAll();
  const filtered = tasks.filter((t) => t.taskId !== taskId);
  writeAll(filtered);
  return filtered.length !== tasks.length;
};


