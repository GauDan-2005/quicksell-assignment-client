import React, { useState, useEffect } from "react";
import styles from "./KanbanBoard.module.scss";
import DisplayMenu from "../DisplayMenu/DisplayMenu";
import Column from "../Column/Column";
import { Task, User, GroupingOption, SortingOption } from "../../utils/types";
import { groupTasks, sortTasks } from "../../utils/utils";
import { statusColumns, priorityColumns } from "../../utils/constants";

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [grouping, setGrouping] = useState<GroupingOption>("status");
  const [sorting, setSorting] = useState<SortingOption>("priority");

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

  const sortedTasks = sortTasks(tasks, sorting);
  const groupedTasks = groupTasks(sortedTasks, grouping, users);

  const renderColumns = () => {
    if (grouping === "status") {
      return statusColumns.map((status) => (
        <Column
          key={status}
          group={status}
          tasks={groupedTasks[status] || []}
          users={users}
          grouping={grouping}
        />
      ));
    } else if (grouping === "priority") {
      return priorityColumns.map((priority) => (
        <Column
          key={priority}
          group={priority}
          tasks={groupedTasks[priority] || []}
          users={users}
          grouping={grouping}
        />
      ));
    } else {
      return Object.entries(groupedTasks).map(([group, tasks]) => (
        <Column
          key={group}
          group={group}
          tasks={tasks}
          users={users}
          grouping={grouping}
        />
      ));
    }
  };

  return (
    <div className={styles.kanbanBoard}>
      <DisplayMenu
        grouping={grouping}
        sorting={sorting}
        setGrouping={setGrouping}
        setSorting={setSorting}
      />
      <div className={styles.boardGrid}>{renderColumns()}</div>
    </div>
  );
}
