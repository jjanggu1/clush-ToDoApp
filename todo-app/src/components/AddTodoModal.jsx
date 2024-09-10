import React, { useState, useEffect } from "react";
import { Modal, Input } from "antd";
import { useRecoilState } from "recoil";
import { todoState } from "../atoms/todoState";

const AddTodoModal = ({
  isModalOpen,
  handleCancel,
  mode,
  listId,
  taskId,
  itemId,
  initialValue = "",
}) => {
  const [newTodo, setNewTodo] = useState(initialValue);
  const [todos, setTodos] = useRecoilState(todoState);

  // 초기값이 변경되면 newTodo를 업데이트
  useEffect(() => {
    setNewTodo(initialValue);
  }, [initialValue]);

  // 입력값 변경 시 상태 업데이트
  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  // 모달 확인 버튼 클릭 시 작업 추가 또는 수정
  const handleAddTodo = () => {
    if (mode === "addList") {
      handleModalOk(newTodo);
    } else {
      handleModalOk();
    }
    setNewTodo("");
    handleCancel();
  };

  // 모달 확인 버튼 클릭 시 처리 로직
  const handleModalOk = () => {
    switch (mode) {
      case "addList":
        // 새로운 리스트 추가
        const newList = {
          id: `list-${Date.now()}`,
          listName: newTodo,
          tasks: [],
        };
        setTodos([...todos, newList]);
        break;
      case "addTodo":
        // 새로운 할 일 추가
        setTodos(
          todos.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  tasks: [
                    ...list.tasks,
                    { id: `task-${Date.now()}`, taskName: newTodo, items: [] },
                  ],
                }
              : list
          )
        );
        break;
      case "editTodo":
        // 할 일 수정
        setTodos(
          todos.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  tasks: list.tasks.map((task) =>
                    task.id === taskId ? { ...task, taskName: newTodo } : task
                  ),
                }
              : list
          )
        );
        break;
      case "addSubTask":
        // 서브태스크 추가
        setTodos(
          todos.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  tasks: list.tasks.map((task) =>
                    task.id === taskId
                      ? {
                          ...task,
                          items: [
                            ...task.items,
                            {
                              id: `item-${Date.now()}`,
                              task: newTodo,
                              completed: false,
                            },
                          ],
                        }
                      : task
                  ),
                }
              : list
          )
        );
        break;
      case "editSubTask":
        // 서브태스크 수정
        setTodos(
          todos.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  tasks: list.tasks.map((task) =>
                    task.id === taskId
                      ? {
                          ...task,
                          items: task.items.map((item) =>
                            item.id === itemId
                              ? { ...item, task: newTodo }
                              : item
                          ),
                        }
                      : task
                  ),
                }
              : list
          )
        );
        break;
      case "deleteSubTask":
        // 서브태스크 삭제
        setTodos(
          todos.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  tasks: list.tasks.map((task) =>
                    task.id === taskId
                      ? {
                          ...task,
                          items: task.items.filter(
                            (item) => item.id !== itemId
                          ),
                        }
                      : task
                  ),
                }
              : list
          )
        );
        break;
      default:
        break;
    }
  };

  // 모달 제목 결정
  const getModalTitle = () => {
    switch (mode) {
      case "addList":
        return "리스트 추가";
      case "addTodo":
        return `할 일 추가`;
      case "editTodo":
        return "할 일 수정";
      case "addSubTask":
        return `세부 할 일 추가`;
      case "editSubTask":
        return "세부 할 일 수정";
      case "deleteTodo":
        return "할 일 삭제";
      case "deleteSubTask":
        return "세부 할 일 삭제";
      default:
        return "";
    }
  };

  // 입력 필드의 placeholder 결정
  const getPlaceholderText = () => {
    switch (mode) {
      case "addList":
        return "리스트 이름을 입력하세요";
      case "addTodo":
        return "추가할 할 일을 입력하세요";
      case "editTodo":
        return "수정할 내용을 입력하세요";
      case "addSubTask":
        return "추가할 세부 할 일을 입력하세요";
      case "editSubTask":
        return "수정할 세부 할 일을 입력하세요";
      case "deleteTodo":
        return "삭제할 할 일 ID를 입력하세요";
      case "deleteSubTask":
        return "삭제할 세부 할 일 ID를 입력하세요";
      default:
        return "";
    }
  };

  return (
    <Modal
      title={getModalTitle()}
      open={isModalOpen}
      onOk={handleAddTodo}
      onCancel={handleCancel}
      style={{ top: "50%", transform: "translateY(-50%)" }}
      okText={mode === "editTodo" || mode === "editList" ? "수정" : "추가"}
      cancelText="취소"
    >
      <p>{getPlaceholderText()}</p>
      <Input
        placeholder={getPlaceholderText()}
        value={newTodo}
        onChange={handleInputChange}
      />
    </Modal>
  );
};

export default AddTodoModal;
