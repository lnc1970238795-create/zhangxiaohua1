import React, { useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import { 
  FileAddOutlined, 
  RobotOutlined, 
  SortAscendingOutlined, 
  ColumnWidthOutlined, 
  TrendingUpOutlined, 
  MessageOutlined, 
  HomeOutlined 
} from '@ant-design/icons'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import PatentCollection from './pages/PatentCollection'
import AIPage from './pages/AIPage'
import ClassificationPage from './pages/ClassificationPage'
import ComparisonPage from './pages/ComparisonPage'
import TrendPage from './pages/TrendPage'
import ChatPage from './pages/ChatPage'

const { Header, Sider, Content } = Layout

// 导航组件
const Navigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [current, setCurrent] = useState('home')
  const { token: { colorBgContainer } } = theme.useToken()

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: '首页'
    },
    {
      key: 'collection',
      icon: <FileAddOutlined />,
      label: '专利收集'
    },
    {
      key: 'ai-processing',
      icon: <RobotOutlined />,
      label: 'AI智能处理'
    },
    {
      key: 'classification',
      icon: <SortAscendingOutlined />,
      label: '分类整理'
    },
    {
      key: 'comparison',
      icon: <ColumnWidthOutlined />,
      label: '对比分析'
    },
    {
      key: 'trend',
      icon: <TrendingUpOutlined />,
      label: '趋势分析'
    },
    {
      key: 'chat',
      icon: <MessageOutlined />,
      label: '智能对话'
    }
  ]

  const handleMenuClick = (e: any) => {
    setCurrent(e.key)
    navigate(`/${e.key}`)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#001529' }}>
        <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>专利文献管理系统</div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            selectedKeys={[current]}
            onClick={handleMenuClick}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
        <Content style={{ padding: '24px', background: colorBgContainer, margin: 0, minHeight: 280 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/collection" element={<PatentCollection />} />
            <Route path="/ai-processing" element={<AIPage />} />
            <Route path="/classification" element={<ClassificationPage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/trend" element={<TrendPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

// 首页组件
const HomePage = () => (
  <div style={{ textAlign: 'center', padding: '40px 0' }}>
    <h1>专利文献管理系统</h1>
    <p>选择左侧菜单进入相应功能模块</p>
  </div>
)











function App() {
  return (
    <Router>
      <Navigation />
    </Router>
  )
}

export default App