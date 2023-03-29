import React from "react";

import cross from "../../database/icons/cross.png";

import { IsTaskInfo } from "../../interfaces";

import IconButton from "../IconButton/IconButton";

import {
  StyledTaskInfoContainer,
  StyledTaskInfo,
  StyledTask,
  StyledLabel,
} from "./TaskInfo.styled";

interface TaskInfoProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  module: IsTaskInfo[];
}

const TaskInfo = ({ visible, setVisible, module }: TaskInfoProps) => {
  return (
    <StyledTaskInfoContainer visible={visible}>
      <StyledTaskInfo>
        <IconButton onClick={() => setVisible(false)} src={cross} />
        {module.map((info) => {
          return (
            <StyledTask key={info.label}>
              <StyledLabel>{info.label}:</StyledLabel>
              <div>{info.value}</div>
            </StyledTask>
          );
        })}
      </StyledTaskInfo>
    </StyledTaskInfoContainer>
  );
};

export default TaskInfo;
