import React from "react";

import { useDispatch } from "react-redux";
import { deleteTask, nextState } from "../../redux/reducer";

import trash from "../../database/icons/trash.png";
import checkbox from "../../database/icons/checkbox.png";
import info from "../../database/icons/info.png";

import { IsTaskInfo } from "../../interfaces";
import { Column } from "../Kanban/Kanban";

import IconButton from "../IconButton/IconButton";

import {
  StyledButtonsContainer,
  StyledColumn,
  StyledLabel,
  StyledNoTaskInfo,
  StyledTask,
  StyledTaskContainer,
} from "./OneColumn.styled";

interface OneColumnProps {
  column: Column;
  setVisible: (visible: boolean) => void;
  setModule: (module: IsTaskInfo[]) => void;
}

const OneColumn = ({ column, setVisible, setModule }: OneColumnProps) => {
  const dispatch = useDispatch();
  return (
    <StyledColumn>
      <h3>{column.name}</h3>
      {column.tasks.length === 0 ? (
        <StyledNoTaskInfo>No tasks</StyledNoTaskInfo>
      ) : (
        column.tasks.map((task) => {
          return (
            <StyledTaskContainer key={column.id}>
              {task.taskInfo.map((info) => {
                return info.important ? (
                  <StyledTask key={info.label}>
                    <StyledLabel>{info.label}:</StyledLabel>
                    <div>{info.value}</div>
                  </StyledTask>
                ) : (
                  <></>
                );
              })}
              <StyledButtonsContainer>
                <IconButton
                  src={trash}
                  onClick={() => dispatch(deleteTask(task.id))}
                />
                <IconButton
                  src={info}
                  onClick={() => {
                    setVisible(true);
                    setModule(task.taskInfo);
                  }}
                />
                <IconButton
                  src={checkbox}
                  onClick={() => dispatch(nextState(task.id))}
                />
              </StyledButtonsContainer>
            </StyledTaskContainer>
          );
        })
      )}
    </StyledColumn>
  );
};

export default OneColumn;
