import { images } from "../constants/images";

export const priorityLabels: { [key: number]: string } = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};

export const statusIcons: { [key: string]: string } = {
  Todo: images.to_do,
  "In progress": images.in_progress,
  Done: images.done,
  Canceled: images.cancelled,
  Backlog: images.backlog,
};

export const priorityIcons: { [key: string]: string } = {
  Urgent: images.urgent_priority_color,
  High: images.high_priority,
  Medium: images.medium_priority,
  Low: images.low_priority,
  "No priority": images.no_priority,
};

export const statusColumns: string[] = [
  "Backlog",
  "Todo",
  "In progress",
  "Done",
  "Canceled",
];
export const priorityColumns: string[] = [
  "No priority",
  "Low",
  "Medium",
  "High",
  "Urgent",
];
