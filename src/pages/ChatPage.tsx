import React, { useState } from 'react'
import { Card, Input, Button, List, Avatar, Space, message, Tag, Divider } from 'antd'
import { SendOutlined, RobotOutlined, HistoryOutlined, QuestionCircleOutlined } from '@ant-design/icons'

const { TextArea } = Input

// 模拟对话历史
const mockChatHistory = [
  {
    id: '1',
    content: '你好，我想查询关于太阳能电池的专利',
    sender: 'user',
    timestamp: '2024-01-01 10:00:00'
  },
  {
    id: '2',
    content: '好的，我为您找到以下关于太阳能电池的专利：\n1. 一种新型太阳能电池 (CN123456789)\n2. 高效太阳能电池制造方法 (CN987654321)\n3. 太阳能电池组件结构优化 (CN567890123)',
    sender: 'ai',
    timestamp: '2024-01-01 10:00:30'
  },
  {
    id: '3',
    content: '这些专利的申请日期是什么时候？',
    sender: 'user',
    timestamp: '2024-01-01 10:01:00'
  },
  {
    id: '4',
    content: '这三个专利的申请日期分别是：\n1. 一种新型太阳能电池：2023-01-15\n2. 高效太阳能电池制造方法：2023-03-10\n3. 太阳能电池组件结构优化：2023-05-20',
    sender: 'ai',
    timestamp: '2024-01-01 10:01:30'
  }
]

// 常见问题
const commonQuestions = [
  '查询人工智能领域的专利',
  '分析最近五年的专利趋势',
  '对比两个专利的技术方案',
  '查看专利的法律状态',
  '导出专利分析报告'
]

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState(mockChatHistory)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = () => {
    if (!inputValue.trim()) return

    // 添加用户消息
    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user' as const,
      timestamp: new Date().toLocaleString()
    }

    setMessages([...messages, userMessage])
    setInputValue('')
    setIsLoading(true)

    // 模拟AI回复
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        sender: 'ai' as const,
        timestamp: new Date().toLocaleString()
      }
      setMessages([...messages, userMessage, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  const getAIResponse = (message: string): string => {
    // 简单的关键词匹配
    if (message.includes('专利') && message.includes('查询')) {
      return '请问您想查询哪个领域的专利？您可以指定技术领域、申请人或关键词。'
    } else if (message.includes('趋势') || message.includes('分析')) {
      return '我可以为您分析专利趋势。请告诉我您感兴趣的技术领域和时间范围。'
    } else if (message.includes('对比')) {
      return '请告诉我您想对比哪两个专利，以及您关注的对比维度（如技术方案、权利要求等）。'
    } else if (message.includes('法律状态')) {
      return '请提供专利号或专利名称，我可以为您查询其法律状态。'
    } else if (message.includes('导出') || message.includes('报告')) {
      return '我可以为您导出专利分析报告。请告诉我您需要哪种类型的报告。'
    } else if (message.includes('你好') || message.includes('您好')) {
      return '您好！我是专利文献管理系统的智能助手，有什么可以帮您的吗？'
    } else {
      return '感谢您的提问。我可以帮助您查询专利信息、分析专利趋势、对比专利技术方案等。请问您具体需要什么帮助？'
    }
  }

  const handleCommonQuestion = (question: string) => {
    setInputValue(question)
    handleSend()
  }

  return (
    <div className="module-container">
      <h2>智能对话</h2>
      
      <Card title="专利智能助手" style={{ marginBottom: '20px' }}>
        <div style={{ height: '400px', overflowY: 'auto', marginBottom: '20px' }}>
          <List
            dataSource={messages}
            key="id"
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar icon={item.sender === 'user' ? <QuestionCircleOutlined /> : <RobotOutlined />} />
                  }
                  title={item.sender === 'user' ? '您' : '智能助手'}
                  description={
                    <div>
                      <p>{item.content}</p>
                      <span style={{ fontSize: '12px', color: '#999' }}>{item.timestamp}</span>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <TextArea 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="请输入您的问题，例如：查询人工智能领域的专利"
            rows={3}
            onPressEnter={() => handleSend()}
          />
          <Button 
            type="primary" 
            icon={<SendOutlined />} 
            onClick={handleSend}
            loading={isLoading}
            disabled={!inputValue.trim()}
            style={{ alignSelf: 'flex-end' }}
          >
            发送
          </Button>
        </div>
      </Card>
      
      <Card title="常见问题">
        <Space wrap>
          {commonQuestions.map((question, index) => (
            <Tag 
              key={index} 
              color="blue" 
              style={{ cursor: 'pointer' }}
              onClick={() => handleCommonQuestion(question)}
            >
              {question}
            </Tag>
          ))}
        </Space>
        
        <Divider orientation="left">使用提示</Divider>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>您可以直接输入自然语言查询专利信息</li>
          <li>支持查询专利趋势、对比分析等功能</li>
          <li>可以通过对话方式完成系统操作</li>
          <li>系统会根据您的问题提供智能回复</li>
        </ul>
      </Card>
    </div>
  )
}

export default ChatPage