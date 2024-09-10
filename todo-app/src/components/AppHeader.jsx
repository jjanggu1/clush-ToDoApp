import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Layout, Typography, theme } from "antd";
import { useRecoilValue } from "recoil";
import { currentListState } from "../atoms/todoState";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
  // Recoil에서 현재 리스트 상태를 읽어옴
  const currentList = useRecoilValue(currentListState);

  // 사이드바가 접혔는지 여부를 관리하는 상태
  const [collapsed, setCollapsed] = useState(false);

  // Ant Design의 테마 토큰을 사용하여 배경 색상을 가져옴
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer, // 배경 색상
          display: "flex", // 수평 정렬
          alignItems: "center", // 세로 정렬
          borderBottom: "1px solid #f5f5f5", // 하단 테두리
        }}
      >
        {/* 사이드바 접기/펼치기 버튼 */}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)} // 버튼 클릭 시 사이드바 상태 토글
          style={{
            fontSize: "16px", // 아이콘 크기
            width: 64, // 버튼 너비
            height: 64, // 버튼 높이
          }}
        />
        {/* 현재 리스트 제목을 중앙에 표시 */}
        <Title
          level={4}
          style={{
            margin: 0, // 마진 없음
            flex: 1, // 남은 공간을 차지하도록 설정
            textAlign: "center", // 텍스트 중앙 정렬
            fontWeight: "normal", // 일반 글씨 굵기
          }}
        >
          {currentList} {/* 현재 리스트 이름 표시 */}
        </Title>
      </Header>
    </>
  );
};

export default AppHeader;
