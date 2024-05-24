import tw from "tailwind-styled-components";
import styled from "styled-components";

import Delete from "../../assets/Trash.png";
import Edit from "../../assets/NotePencil.png";
import Cancel from "../../assets/close.png";
import Save from "../../assets/save.png";

import { useState } from "react";
import { DeletionAlert } from "../../utils/Utilities";
import Task from "../../../../domain/entity/task/task.entity";

const TaskWrapper = tw.div`
    flex flex-row
    mt-3
    max-h-18
`;
const CheckBoxWrapper = tw.div`
    flex 
    justify-center 
    items-center 
    bg-[#1B1D37] 
    w-12 
    rounded-l
`;

const CheckBox = styled.input.attrs({ type: "checkbox" })`
  background-color: #797979;
  padding: 1px;
  border-radius: 2px;
  height: 1.3rem;
  width: 6rem;
  outline: none;
  cursor: pointer;
`;

const TaskTextWrapper = tw.div`
    flex flex-1 
    bg-[#1B1D37] 
    h-18 
    ml-1 mr-1 
    px-3 py-1  
    text-white text-[.8rem] font-bold 
`;

const TaskText = styled.p`
  min-height: 18px;
  text-overflow: ellipsis;
`;

const ActionsWrapper = tw.div`flex flex-col w-8`;

const Actions = tw.div`
    flex flex-1 
    justify-center items-center
    p-1
`;
const ActionDelete = tw(Actions)`
    bg-[#CE0000] 
    rounded-tr 
    mb-1
`;
const ActionEdit = tw(Actions)`
    bg-[#797979]
    rounded-br
`;

const EditableField = tw.textarea`
    bg-[#1B1D37] 
    min-h-full
    w-full
    border-0
    outline-0
    text-white text-[.8rem] font-bold
    resize-none
    scrollbar-hide
    m-1
`;

interface ActionButtonProps {
  click: React.MouseEventHandler<HTMLButtonElement>;
  w: number;
  h: number;
  source: string;
}

const ActionButton = (actions: ActionButtonProps) => {
  return (
    <button className="outline-0" onClick={actions.click}>
      <img
        src={actions.source}
        alt="action-button"
        width={actions.w}
        height={actions.h}
      />
    </button>
  );
};

export interface TaskAttr {
  task: Task;
  actions: {
    save: (task: Task) => void;
    delete: (id: string) => void;
  };
}

export const TaskWidget = ({ task, actions }: TaskAttr) => {
  const [edited, setEditedValue] = useState(task.title);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditValue(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setEditedValue(event.target.value);
  }

  function handleToggleDone() {
    isEditing && setIsEditing(false);
    toggleDone();
  }

  function handleEdit() {
    !isEditing && setIsEditing(true);
    task.isDone && toggleDone();
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }

  function toggleDone() {
    task.isDone ? task.setAsPending() : task.setAsDone();
    actions.save(task);
  }

  function handleSaveEdited() {
    task.title = edited;
    actions.save(task);
    setIsEditing(false);
  }

  function handleDelete() {
    actions.delete(task.id!);
  }

  return (
    <TaskWrapper>
      <CheckBoxWrapper>
        <CheckBox onChange={handleToggleDone} checked={task.isDone} />
      </CheckBoxWrapper>
      <TaskTextWrapper>
        {!isEditing && (
          <TaskText
            className={`${task.isDone && "line-through text-[#636AC7]"}`}
          >
            {task.title}
          </TaskText>
        )}

        {isEditing && (
          <EditableField
            value={edited}
            autoFocus={true}
            onChange={handleEditValue}
          />
        )}
      </TaskTextWrapper>
      <ActionsWrapper>
        <ActionDelete className={`${isEditing && "py-3"}`}>
          {!isEditing && <DeletionAlert onDeleteTask={() => handleDelete()} />}

          {isEditing && (
            <ActionButton
              source={Cancel}
              w={12}
              h={10}
              click={handleCancelEdit}
            />
          )}
        </ActionDelete>
        <ActionEdit className={`${isEditing && "py-3"}`}>
          {!isEditing && (
            <ActionButton source={Edit} w={20} h={20} click={handleEdit} />
          )}

          {isEditing && (
            <ActionButton
              source={Save}
              w={15}
              h={12}
              click={handleSaveEdited}
            />
          )}
        </ActionEdit>
      </ActionsWrapper>
    </TaskWrapper>
  );
};
