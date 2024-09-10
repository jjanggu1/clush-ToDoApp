import React, { useState } from "react";
import { Layout, Menu, Button, Modal } from "antd";
import {
  CheckCircleOutlined,
  PlusOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import AddTodoModal from "./AddTodoModal";
import { useRecoilState } from "recoil";
import { todoState, currentListState } from "../atoms/todoState";

const { Sider } = Layout;

const AppSidebar = ({ collapsed, colorBgContainer }) => {
  const [todos, setTodos] = useRecoilState(todoState);
  const [currentList, setCurrentList] = useRecoilState(currentListState);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListTitle, setSelectedListTitle] = useState("새 리스트");
  const [pickCurrList, setPickCurrList] = useState(`${todos[0]?.listName}`);
  const [hoveredList, setHoveredList] = useState(null);
  const [modalMode, setModalMode] = useState("addList");

  // 메뉴 항목 클릭 시 현재 리스트를 설정
  const handleMenuClick = ({ key }) => {
    setPickCurrList(key);
    setCurrentList(key);
  };

  // 모달을 열고 모드 설정
  const showModal = () => {
    setModalMode("addList");
    setIsModalOpen(true);
  };

  // 모달 확인 버튼 클릭 시 리스트 추가 처리
  const handleModalOk = (newListTitle) => {
    const newKey = `list-${Date.now()}`;
    const newList = { id: newKey, listName: newListTitle, tasks: [] };
    setTodos([...todos, newList]);
    setIsModalOpen(false);
  };

  // 모달 취소 버튼 클릭 시 모달 닫기
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  // 리스트 삭제 확인 모달
  const showDeleteConfirm = (id) => {
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
        setTodos((prevItems) => prevItems.filter((item) => item.id !== id));
      },
    });
  };

  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: colorBgContainer,
          height: "100vh",
          borderRight: "1px solid #eee",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          selectedKeys={[currentList]}
          onClick={handleMenuClick}
          style={{
            flex: 1,
            borderRight: 0,
          }}
          items={[
            {
              key: "1",
              icon: <CheckCircleOutlined />,
              label: "리스트",
              type: "group",
              children: todos.map((item) => ({
                key: item.listName,
                icon: <CheckCircleOutlined />,
                label: (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      position: "relative",
                      padding: "8px",
                      backgroundColor:
                        pickCurrList === item.listName ? "#e6f7ff" : "",
                    }}
                    onMouseEnter={() => setHoveredList(item.listName)}
                    onMouseLeave={() => setHoveredList(null)}
                  >
                    <span>{item.listName}</span>
                    <span style={{ marginLeft: 8, color: "#888" }}>
                      {item.tasks.length}
                    </span>
                    {hoveredList === item.listName && (
                      <DeleteFilled
                        style={{
                          position: "absolute",
                          right: "6px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "#ff4d4f",
                          fontSize: "16px",
                        }}
                        onClick={() => showDeleteConfirm(item.id)}
                      />
                    )}
                  </div>
                ),
              })),
            },
          ]}
        />
        <Button
          type="text"
          icon={<PlusOutlined />}
          style={{
            fontSize: "16px",
            width: "100%",
            height: 42,
          }}
          onClick={showModal}
        />
      </Sider>
      <AddTodoModal
        isModalOpen={isModalOpen}
        handleOk={(newListTitle) => handleModalOk(newListTitle)}
        handleCancel={handleModalCancel}
        listTitle={selectedListTitle}
        mode={modalMode}
      />
    </>
  );
};

export default AppSidebar;
