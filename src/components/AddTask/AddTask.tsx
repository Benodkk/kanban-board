import React, { useState } from "react";
import uniqid from "uniqid";

import { useDispatch } from "react-redux";
import { addToList } from "../../redux/reducer";

import { columns } from "../../database/columns";
import { fields } from "../../database/fields";

import { IsTaskInfo } from "../../interfaces";

import Errors from "../Errors/Errors";

import {
  StyledAddTaskSection,
  StyledForm,
  StyledInputContainer,
  StyledSubmitBtn,
} from "./AddTask.styled";

const AddTask = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(fields);
  const [textareaValue, setTextareaValue] = useState("");
  const [columnValue, setColumnValue] = useState(columns[0].id);
  const [errorsInfo, setErrorsInfo] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value;
    const newInputs = [...inputs];
    newInputs[index] = { ...newInputs[index], value };
    setInputs(newInputs);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColumnValue(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: string[] = [];
    const id = uniqid();
    const taskState = columns.find(
      (column) => column.id === Number(columnValue)
    );
    const taskInfo: IsTaskInfo[] = [];

    inputs.map((input) => {
      if (input.value.length === 0) {
        errors.push(input.error);
      } else {
        taskInfo.push({
          label: input.label,
          value: input.value,
          important: true,
        });
      }
    });

    taskInfo.push({
      label: "Description",
      value: textareaValue,
      important: false,
    });

    if (errors.length === 0 && taskState) {
      dispatch(addToList(id, taskState, taskInfo));
      setInputs(
        inputs.map((input) => {
          return { ...input, value: "" };
        })
      );
      setTextareaValue("");
    } else {
      setErrorsInfo(errors);
      setShowErrors(true);
    }
  };

  return (
    <StyledAddTaskSection>
      <h2>Add task</h2>
      <StyledForm onSubmit={(e) => handleSubmit(e)}>
        {inputs.map((field, index) => {
          return (
            <StyledInputContainer key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                name={field.name}
                value={field.value}
                type={field.type}
                onChange={(event) => handleInputChange(event, index)}
              />
            </StyledInputContainer>
          );
        })}
        <StyledInputContainer>
          <label htmlFor="taskDescription">Short description</label>
          <textarea
            name="taskDescription"
            value={textareaValue}
            onChange={(e) => handleTextareaChange(e)}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <label htmlFor="column">Task state</label>
          <select
            name="column"
            value={columnValue}
            onChange={(e) => handleSelectChange(e)}
          >
            {columns.map((column) => {
              return (
                <option key={column.id} value={column.id}>
                  {column.name}
                </option>
              );
            })}
          </select>
        </StyledInputContainer>
        <StyledSubmitBtn value="Submit" type="submit" />
      </StyledForm>
      <Errors
        errors={errorsInfo}
        showErrors={showErrors}
        setShowErrors={setShowErrors}
      />
    </StyledAddTaskSection>
  );
};

export default AddTask;
