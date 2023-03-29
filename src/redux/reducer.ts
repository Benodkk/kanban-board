import { createStore } from "redux";
import { columns } from "../database/columns";
import { ActionType } from "./action-types";
import { Action } from "./actions";

import { IsTaskInfo, IsTaskState } from "../interfaces";

const STORAGE_KEY = "my_app_state";

const savedState = localStorage.getItem(STORAGE_KEY);
const initialState = savedState
  ? JSON.parse(savedState)
  : {
      tasks: [],
    };

function addToList(id: string, taskState: IsTaskState, taskInfo: IsTaskInfo[]) {
  return {
    type: ActionType.addToList,
    id: id,
    taskState: taskState,
    taskInfo: taskInfo,
  };
}

function nextState(id: string) {
  return {
    type: ActionType.nextState,
    id: id,
  };
}

function deleteTask(id: string) {
  return {
    type: ActionType.deleteTask,
    id: id,
  };
}

export { addToList, nextState, deleteTask };

function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionType.addToList: {
      const newState1 = {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: action.id,
            taskState: action.taskState,
            taskInfo: action.taskInfo,
          },
        ],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState1));
      return newState1;
    }
    case ActionType.nextState: {
      const newState2 = {
        ...state,
        tasks: state.tasks.map(
          (task: {
            id: string;
            taskState: IsTaskState;
            taskInfo: IsTaskInfo[];
          }) =>
            task.id === action.id && task.taskState.id < columns.length
              ? {
                  ...task,
                  taskState:
                    columns[
                      columns.findIndex(
                        (column: { id: number; name: string }) =>
                          column.id === task.taskState.id
                      ) + 1
                    ],
                }
              : task
        ),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState2));
      return newState2;
    }
    case ActionType.deleteTask: {
      let newState3 = {
        ...state,
        tasks: state.tasks.filter(
          (task: {
            id: string;
            taskState: IsTaskState;
            taskInfo: IsTaskInfo[];
          }) => task.id !== action.id
        ),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState3));
      return newState3;
    }
    default:
      return state;
  }
}

export type RootState = ReturnType<typeof reducer>;

const store = createStore(reducer);

export default store;
