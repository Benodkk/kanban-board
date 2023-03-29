import { ActionType } from "./action-types";
import { TaskState, TaskInfo } from "../interfaces";

interface addToListAction {
  type: ActionType.addToList;
  id: string;
  taskState: TaskState;
  taskInfo: TaskInfo[];
}

interface nextStateAction {
  type: ActionType.nextState;
  id: string;
}

interface deleteTaskAction {
  type: ActionType.deleteTask;
  id: string;
}

export type Action = addToListAction | nextStateAction | deleteTaskAction;
