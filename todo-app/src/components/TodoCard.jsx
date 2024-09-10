import React from "react";
import { Card, List, Button, Checkbox, Dropdown, Menu } from "antd";
import {
  PlusOutlined,
  DeleteFilled,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";

const TodoCard = ({
  title,
  items = [], // items가 항상 배열이 되도록 기본값 설정
  onAddTodo,
  onEditTask,
  onDeleteTask,
  onToggleComplete,
  onEditCard,
  onDeleteCard,
}) => {
  const menu = (
    <Menu>
      <Menu.Item onClick={onEditCard}>이름 수정</Menu.Item>
      <Menu.Item danger onClick={onDeleteCard}>
        삭제
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{items.taskName}</span>
          <div>
            <span style={{ color: "rgba(0, 0, 0, 0.45)" }}>{items.length}</span>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button
                icon={<MoreOutlined />}
                style={{
                  border: "none",
                  background: "transparent",
                  width: "16px",
                  height: "16px",
                  marginLeft: "8px",
                }}
              />
            </Dropdown>
          </div>
        </div>
      }
      headStyle={{ borderBottom: "none" }}
      style={{ height: "100%" }}
    >
      <List
        bordered={false}
        dataSource={items}
        renderItem={(item) => (
          <List.Item style={{ border: "none", padding: "8px 0" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Checkbox
                checked={item.completed}
                onChange={() => onToggleComplete(item.id)}
              >
                {item.task}
              </Checkbox>
              <div>
                <EditOutlined
                  style={{ padding: "2px", cursor: "pointer" }}
                  onClick={() => onEditTask(item.id, item.task)}
                />
                <DeleteFilled
                  style={{
                    padding: "2px",
                    cursor: "pointer",
                    color: "#ff4d4f",
                  }}
                  onClick={() => onDeleteTask(item.id)}
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
        onClick={onAddTodo}
      />
    </Card>
  );
};

export default TodoCard;
