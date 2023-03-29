export interface IsTaskInfo {
  label: string;
  value: string;
  important: boolean;
}

export interface IsTaskState {
  id: number;
  name: string;
}

export interface IsTask {
  id: string;
  taskState: IsTaskState;
  taskInfo: IsTaskInfo[];
}
