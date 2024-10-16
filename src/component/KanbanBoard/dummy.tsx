import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

import styles from "./KanbanBoard.module.scss";

type Task = {
  id: string;
  title: string;
  tag: string[];
  userId: string;
  status: string;
  priority: number;
};

type User = {
  id: string;
  name: string;
  available: boolean;
};

const priorityLabels: { [key: number]: string } = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};

const statusIcons: { [key: string]: string } = {
  Todo: "🔵",
  "In progress": "🟡",
  Done: "🟢",
  Canceled: "⚪",
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [grouping, setGrouping] = useState<"status" | "user" | "priority">(
    "status"
  );
  const [sorting, setSorting] = useState<"priority" | "title">("priority");
  const [isDisplayMenuOpen, setIsDisplayMenuOpen] = useState(false);

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tickets);
        setUsers(data.users);
      });
  }, []);

  useEffect(() => {
    const savedView = localStorage.getItem("kanbanView");
    if (savedView) {
      const { grouping, sorting } = JSON.parse(savedView);
      setGrouping(grouping);
      setSorting(sorting);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kanbanView", JSON.stringify({ grouping, sorting }));
  }, [grouping, sorting]);

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sorting === "priority") return b.priority - a.priority;
    return a.title.localeCompare(b.title);
  });

  const groupedTasks = sortedTasks.reduce((acc, task) => {
    let key;
    if (grouping === "status") key = task.status;
    else if (grouping === "user")
      key = users.find((user) => user.id === task.userId)?.name || "Unassigned";
    else key = priorityLabels[task.priority];

    if (!acc[key]) acc[key] = [];
    acc[key].push(task);
    return acc;
  }, {} as { [key: string]: Task[] });

  console.log(groupedTasks);

  return (
    <div className={styles.kanbanBoard}>
      <div className={styles.header}>
        <div className={styles.displayMenu}>
          <button
            onClick={() => setIsDisplayMenuOpen(!isDisplayMenuOpen)}
            className={styles.displayButton}
          >
            <span>Display</span>
            <ChevronDown className={styles.icon} />
          </button>
          {isDisplayMenuOpen && (
            <div className={styles.menuDropdown}>
              <div className={styles.menuContent}>
                <div className={styles.menuItem}>
                  <p>Grouping</p>
                  <select
                    value={grouping}
                    onChange={(e) =>
                      setGrouping(
                        e.target.value as "status" | "user" | "priority"
                      )
                    }
                  >
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
                <div className={styles.menuItem}>
                  <p>Ordering</p>
                  <select
                    value={sorting}
                    onChange={(e) =>
                      setSorting(e.target.value as "priority" | "title")
                    }
                  >
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.boardGrid}>
        {Object.entries(groupedTasks).map(([group, tasks]) => (
          <div key={group} className={styles.column}>
            <h2 className={styles.columnHeader}>
              {group} ({tasks.length})
            </h2>
            {tasks.map((task) => (
              <div key={task.id} className={styles.task}>
                <div className={styles.taskHeader}>
                  <span className={styles.taskId}>{task.id}</span>
                  <img
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${
                      users.find((user) => user.id === task.userId)?.name
                    }`}
                    alt="User Avatar"
                    className={styles.avatar}
                  />
                </div>
                <h3 className={styles.taskTitle}>{task.title}</h3>
                <div className={styles.taskFooter}>
                  {grouping !== "priority" && (
                    <span className={styles.tag}>
                      {priorityLabels[task.priority]}
                    </span>
                  )}
                  {grouping !== "status" && (
                    <span className={styles.statusIcon}>
                      {statusIcons[task.status]}
                    </span>
                  )}
                  {task.tag.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
