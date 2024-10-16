import { Task, User, GroupingOption, SortingOption } from "./types";
import { priorityLabels, statusColumns, priorityColumns } from "./constants";

export function sortTasks(tasks: Task[], sorting: SortingOption): Task[] {
  return [...tasks].sort((a, b) => {
    if (sorting === "priority") return b.priority - a.priority;
    return a.title.localeCompare(b.title);
  });
}

export function groupTasks(
  tasks: Task[],
  grouping: GroupingOption,
  users: User[]
): { [key: string]: Task[] } {
  if (grouping === "status") {
    return statusColumns.reduce((acc, status) => {
      acc[status] = tasks.filter((task) => task.status === status);
      return acc;
    }, {} as { [key: string]: Task[] });
  }

  if (grouping === "priority") {
    return priorityColumns.reduce((acc, priority) => {
      acc[priority] = tasks.filter(
        (task) => priorityLabels[task.priority] === priority
      );
      return acc;
    }, {} as { [key: string]: Task[] });
  }

  return tasks.reduce((acc, task) => {
    const key =
      users.find((user) => user.id === task.userId)?.name || "Unassigned";
    if (!acc[key]) acc[key] = [];
    acc[key].push(task);
    return acc;
  }, {} as { [key: string]: Task[] });
}
