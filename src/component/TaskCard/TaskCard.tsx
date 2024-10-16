import styles from "./TaskCard.module.scss";
import { Task, User, GroupingOption } from "../../utils/types";
import {
  priorityIcons,
  priorityLabels,
  statusIcons,
} from "../../utils/constants";

interface TaskCardProps {
  task: Task;
  users: User[];
  grouping: GroupingOption;
}

export default function TaskCard({ task, users, grouping }: TaskCardProps) {
  return (
    <div className={styles.task}>
      <div className={styles.taskHeader}>
        <span className={styles.taskId}>{task.id}</span>
        {grouping !== "user" && (
          <img
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${
              users.find((user) => user.id === task.userId)?.name
            }`}
            alt="User Avatar"
            className={styles.avatar}
          />
        )}
      </div>
      <div className={styles.taskTitleWrapper}>
        {grouping !== "status" && (
          <span className={styles.statusIcon}>
            <img src={statusIcons[task.status]} alt={task.status} />
          </span>
        )}
        <h3 className={styles.taskTitle}>
          {task.title.length > 45
            ? `${task.title.slice(0, 45)}...`
            : task.title}
        </h3>
      </div>

      <div className={styles.taskFooter}>
        {grouping !== "priority" && (
          <img
            src={priorityIcons[priorityLabels[task.priority]]}
            alt={priorityLabels[task.priority]}
            className={styles.statusIcon}
          />
        )}
        {task.tag.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
