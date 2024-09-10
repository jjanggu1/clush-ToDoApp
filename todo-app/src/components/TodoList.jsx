import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Checkbox,
  Dropdown,
  Menu,
  Modal,
} from "antd";
import {
  PlusOutlined,
  DeleteFilled,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { todoState } from "../atoms/todoState";

const TodoList = ({ todos, showModal, currentList }) => {
  // 현재 리스트의 데이터를 상태로 관리
  const [currListData, setCurrListData] = useState([]);

  useEffect(() => {
    // currentList와 일치하는 리스트만 필터링하여 상태에 설정
    const filteredData = todos.filter((item) => item.listName === currentList);
    setCurrListData(filteredData);
  }, [todos, currentList]);

  const [todosRecoil, setTodosRecoil] = useRecoilState(todoState);

  // 할 일을 삭제하기 전에 확인하는 모달
  const showDeleteConfirm = (taskId) => {
    Modal.confirm({
      title: "삭제하시겠습니까?",
      content: "이 작업은 되돌릴 수 없습니다.",
      okText: "삭제",
      cancelText: "취소",
      okButtonProps: {
        style: {
          backgroundColor: "#ff4d4f",
          borderColor: "#ff4d4f",
          color: "#fff",
        },
      },
      onOk() {
        // 해당 작업을 삭제
        setTodosRecoil((prevItems) =>
          prevItems.map((list) => ({
            ...list,
            tasks: list.tasks.filter((task) => task.id !== taskId),
          }))
        );
      },
    });
  };

  // 서브 작업 삭제
  const deleteSubTask = (listId, taskId, itemId) => {
    setTodosRecoil(
      todos.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      items: task.items.filter((item) => item.id !== itemId),
                    }
                  : task
              ),
            }
          : list
      )
    );
  };

  // 서브 작업 완료 상태 토글
  const toogleCompleteSubTask = (listId, taskId, itemId) => {
    console.log(
      `Toggling complete for listId: ${listId}, taskId: ${taskId}, itemId: ${itemId}`
    );

    setTodosRecoil((prevItems) => {
      console.log("Previous state:", prevItems);
      const updatedLists = prevItems.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      items: task.items.map((item) =>
                        item.id === itemId
                          ? { ...item, completed: !item.completed }
                          : item
                      ),
                    }
                  : task
              ),
            }
          : list
      );

      console.log("Updated state:", updatedLists);
      return updatedLists;
    });
  };

  // 작업 메뉴
  const menu = (taskId) => (
    <Menu>
      <Menu.Item
        key="edit"
        onClick={() => showModal("editTodo", currListData[0]?.id, taskId)}
      >
        이름 수정
      </Menu.Item>
      <Menu.Item key="delete" danger onClick={() => showDeleteConfirm(taskId)}>
        삭제
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ padding: "16px" }}>
      <Row
        gutter={16}
        style={{ flexWrap: "wrap", justifyContent: "flex-start" }}
      >
        {currListData &&
          currListData.flatMap((list) =>
            list.tasks.map((task) => (
              <Col
                key={task.id}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                style={{ marginBottom: "16px" }}
              >
                <Card
                  key={task.id}
                  title={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>{task.taskName}</span>
                      <div>
                        <span style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                          {task.items.length}
                        </span>
                        <Dropdown overlay={menu(task.id)} trigger={["click"]}>
                          <Button
                            icon={<MoreOutlined />}
                            style={{
                              border: "none",
                              background: "transparent",
                              marginLeft: "8px",
                            }}
                          />
                        </Dropdown>
                      </div>
                    </div>
                  }
                  headStyle={{ borderBottom: "none" }}
                  style={{ width: "100%" }}
                >
                  <List
                    bordered={false}
                    dataSource={task.items || []}
                    renderItem={(item) => (
                      <List.Item
                        style={{ border: "none", padding: "8px 0" }}
                        key={item.id}
                      >
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color: item.completed ? "#eee" : "inherit",
                            textDecoration: item.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          <Checkbox
                            onClick={() =>
                              toogleCompleteSubTask(
                                currListData[0]?.id,
                                task.id,
                                item.id
                              )
                            }
                            checked={item.completed}
                            style={{
                              color: item.completed ? "#eee" : "inherit",
                              textDecoration: item.completed
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {item.task}
                          </Checkbox>
                          <div>
                            <EditOutlined
                              style={{ padding: "2px", cursor: "pointer" }}
                              onClick={() =>
                                showModal(
                                  "editSubTask",
                                  currListData[0]?.id,
                                  task.id,
                                  item.id,
                                  item.task
                                )
                              }
                            />
                            <DeleteFilled
                              style={{
                                padding: "2px",
                                cursor: "pointer",
                                color: "#ff4d4f",
                              }}
                              onClick={() =>
                                deleteSubTask(
                                  currListData[0]?.id,
                                  task.id,
                                  item.id
                                )
                              }
                            />
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    style={{ fontSize: "16px", width: "100%", height: 42 }}
                    onClick={() =>
                      showModal("addSubTask", currListData[0]?.id, task.id)
                    }
                  />
                </Card>
              </Col>
            ))
          )}
        <Col xs={24} sm={12} md={8} lg={6} style={{ marginBottom: "16px" }}>
          <Card
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              cursor: "pointer",
              width: "100%",
            }}
            onClick={() => showModal("addTodo", currListData[0]?.id)}
          >
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              style={{
                fontSize: "24px",
                width: "100%",
                height: "100%",
                border: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TodoList;
