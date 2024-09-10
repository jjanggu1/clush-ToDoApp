import React, { useState } from "react";
import { Content } from "antd/es/layout/layout";
import AddTodoModal from "./AddTodoModal";
import TodoList from "./TodoList";
import { useRecoilState } from "recoil";
import { todoState, currentListState } from "../atoms/todoState";

const AppContent = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  const [currentList] = useRecoilState(currentListState); // currentListState에서 현재 리스트 이름을 가져옴

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState("");
  const [listId, setListId] = useState("");
  const [taskId, setTaskId] = useState("");
  const [itemId, setItemId] = useState("");
  const [initialValue, setInitialValue] = useState("");

  // 모달을 열고, 현재 모드와 관련된 ID 및 초기 값을 설정
  const showModal = (mode, listId, taskId, itemId, initialValue) => {
    setCurrentMode(mode);
    setListId(listId);
    setTaskId(taskId);
    setItemId(itemId);
    setInitialValue(initialValue);
    setIsModalOpen(true);
  };

  // 모달을 닫고 상태를 초기화
  const handleModalCancel = () => {
    setIsModalOpen(false);
    setCurrentMode("");
    setListId("");
    setTaskId("");
    setItemId("");
    setInitialValue("");
  };

  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 2,
        minHeight: 280,
        background: "#FFFFFF",
      }}
    >
      <div style={{ padding: "16px" }}>
        <TodoList
          todos={todos}
          showModal={showModal}
          currentList={currentList}
        />
      </div>
      <AddTodoModal
        isModalOpen={isModalOpen}
        handleCancel={handleModalCancel}
        mode={currentMode}
        listId={listId}
        taskId={taskId}
        itemId={itemId}
        initialValue={initialValue}
      />
    </Content>
  );
};

export default AppContent;
