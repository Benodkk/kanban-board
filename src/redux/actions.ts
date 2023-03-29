import { ActionType } from "./action-types";
import { IsTaskState, IsTaskInfo } from "../interfaces";

interface addToListAction {
  type: ActionType.addToList;
  id: string;
  taskState: IsTaskState;
  taskInfo: IsTaskInfo[];
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
