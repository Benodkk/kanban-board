import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { columns } from "../../database/columns";

import { RootState } from "../../redux/reducer";
import { IsTask, IsTaskInfo } from "../../interfaces";

import OneColumn from "../OneColumn/OneColumn";
import TaskInfo from "../TaskInfo/TaskInfo";

import { StyledKanban } from "./Kanban.styled";

export interface Column {
  id: number;
  name: string;
  tasks: IsTask[];
}

const Kanban = () => {
  const store = useSelector((state: RootState) => state);
  const [allColumns, setAllColumns] = useState<Column[]>(
    columns.map((column) => {
      return {
        ...column,
        tasks: [],
      };
    })
  );
  const [visible, setVisible] = useState(false);
  const [module, setModule] = useState<IsTaskInfo[]>([]);

  useEffect(() => {
    const newColumns: Column[] = columns.map((column) => {
      return {
        ...column,
        tasks: [],
      };
    });
    store.tasks.forEach((task: IsTask) => {
      const properColumn = allColumns.findIndex(
        (column) => column.id === task.taskState.id
      );
      newColumns[properColumn].tasks.push(task);
    });
    setAllColumns(newColumns);
  }, [store]);
  return (
    <StyledKanban>
      {module ? (
        <TaskInfo visible={visible} setVisible={setVisible} module={module} />
      ) : (
        <></>
      )}
      {allColumns.map((column) => {
        return (
          <OneColumn
            key={column.name}
            column={column}
            setVisible={setVisible}
            setModule={setModule}
          />
        );
      })}
    </StyledKanban>
  );
};

export default Kanban;
