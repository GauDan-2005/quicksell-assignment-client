import styles from "./Column.module.scss";
import TaskCard from "../TaskCard/TaskCard";
import { Task, User, GroupingOption } from "../../utils/types";
import { statusIcons, priorityIcons } from "../../utils/constants";
import { images } from "../../constants/images";

interface ColumnProps {
  group: string;
  tasks: Task[];
  users: User[];
  grouping: GroupingOption;
}

export default function Column({ group, tasks, users, grouping }: ColumnProps) {
  const getIcon = () => {
    if (grouping === "status")
      return (
        <img src={statusIcons[group]} className={styles.statusIcon} alt="" />
      );
    if (grouping === "priority")
      return (
        <img src={priorityIcons[group]} alt="" className={styles.statusIcon} />
      );
    if (grouping === "user") {
      return (
        <img
          src={`https://api.dicebear.com/6.x/initials/svg?seed=${group}`}
          alt="User Avatar"
          className={styles.avatar}
        />
      );
    }
    return null;
  };

  return (
    <div className={styles.column}>
      <h2 className={styles.columnHeader}>
        <p className={styles.heading_title_wrapper}>
          {getIcon()}
          {group} {tasks.length}
        </p>
        <div className={styles.actionWrapper}>
          <img src={images.add} />
          <img src={images.menu} />
        </div>
      </h2>
      {tasks.length > 0 ? (
        <div className={styles.taskWrapper}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              users={users}
              grouping={grouping}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyColumn}>No tasks</div>
      )}
    </div>
  );
}
