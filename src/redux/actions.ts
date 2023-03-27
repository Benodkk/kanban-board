import { ActionType } from "./action-types";

interface addToListAction {
  type: ActionType.addToList;
  id: string;
  taskState: {
    id: number;
    name: string;
  };
  taskInfo: [
    {
      label: string;
      value: string;
      important: boolean;
    },
    {
      label: string;
      value: string;
      important: boolean;
    },
    {
      label: string;
      value: string;
      important: boolean;
    },
    {
      label: string;
      value: string;
      important: boolean;
    }
  ];
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
