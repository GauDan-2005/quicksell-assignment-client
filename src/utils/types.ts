export type Task = {
  id: string;
  title: string;
  tag: string[];
  userId: string;
  status: string;
  priority: number;
};

export type User = {
  id: string;
  name: string;
  available: boolean;
};

export type GroupingOption = 'status' | 'user' | 'priority';
export type SortingOption = 'priority' | 'title';