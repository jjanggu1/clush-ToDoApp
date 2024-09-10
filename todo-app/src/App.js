import './App.css';
import AppHeader from './components/AppHeader';
import AppSidebar from './components/AppSidebar';
import AppContent from './components/AppContent';

import axios from "axios";
import { useEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import { todoState } from './atoms/todoState';

import { Layout, theme } from 'antd';

const BASE_URL = "http://localhost:4000";

function App() {
  // Recoil 상태에서 todos를 관리
  const [todos, setTodos] = useRecoilState(todoState);

  // 서버에서 todos 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchTodoData = async () => {
      try {
        // 서버에서 todos 데이터 요청
        const res = await axios.get(`${BASE_URL}/todos`);
        const data = res.data.lists;
        // 가져온 데이터를 Recoil 상태에 설정
        await setTodos(data);

        return data;
      } catch (e) {
        console.error(e);
      }
    };
    fetchTodoData();
  }, []); // 빈 배열을 dependency로 사용하여 컴포넌트가 처음 렌더링될 때만 호출

  console.log(todos, "전역상태");

  // 사이드바의 접힘 상태를 관리하는 상태
  const [collapsed, setCollapsed] = useState(false);

  // Ant Design의 테마 색상 값 가져오기
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className="App">
      <Layout>
        {/* 사이드바 컴포넌트, collapsed 상태와 색상 값 전달 */}
        <AppSidebar collapsed={collapsed} colorBgContainer={colorBgContainer} />
        <Layout style={{ background: colorBgContainer }}>
          {/* 헤더 컴포넌트 */}
          <AppHeader />
          {/* 콘텐츠 컴포넌트 */}
          <AppContent />
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
