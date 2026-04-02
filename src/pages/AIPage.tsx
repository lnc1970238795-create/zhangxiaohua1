import React, { useState } from 'react'
import { Upload, Button, Card, Input, message, Tabs, Spin, Descriptions, Tag, Divider, Space, Select } from 'antd'
import { InboxOutlined, RobotOutlined, DownloadOutlined, FileTextOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'

const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input

// 模拟AI分析结果
const mockAnalysisResult = {
  keyTechnologies: [
    '太阳能电池材料优化',
    '能量转换效率提升技术',
    '新型电极结构设计',
    '光捕获增强技术'
  ],
  innovations: [
    '采用新型纳米材料提高光电转换效率',
    '优化电池结构减少能量损失',
    '开发低成本制造工艺',
    '延长电池使用寿命'
  ],
  legalStatus: {
    status: '已公开',
    applicationDate: '2023-01-15',
    publicationDate: '2023-07-20',
    patentNumber: 'CN123456789',
    expirationDate: '2043-01-15'
  },
  summary: '本专利涉及一种新型太阳能电池技术，通过优化材料结构和制造工艺，显著提高了能量转换效率，降低了生产成本，具有广阔的应用前景。'
}

// 上传配置
const uploadProps: UploadProps = {
  name: 'file',
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`)
    }
  },
  showUploadList: true,
  maxCount: 1
}

const AIPage: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [selectedPatent, setSelectedPatent] = useState<string>('')
  const [patentText, setPatentText] = useState<string>('')

  // 模拟专利列表
  const patentOptions = [
    { value: 'patent1', label: '一种新型太阳能电池' },
    { value: 'patent2', label: '智能机器人控制系统' },
    { value: 'patent3', label: '新型医药组合物' }
  ]

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    // 模拟分析过程
    setTimeout(() => {
      setAnalysisResult(mockAnalysisResult)
      setIsAnalyzing(false)
      message.success('分析完成')
    }, 2000)
  }

  const handleExport = () => {
    message.success('分析结果已导出')
  }

  return (
    <div className="module-container">
      <h2>AI智能处理</h2>
      
      <Tabs defaultActiveKey="upload">
        <TabPane tab="上传文件" key="upload">
          <div style={{ padding: '20px 0' }}>
            <Upload.Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽专利文件到此区域上传</p>
              <p className="ant-upload-hint">
                支持上传 PDF、DOC、TXT 等格式文件
              </p>
            </Upload.Dragger>
            
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Button 
                type="primary" 
                icon={<RobotOutlined />} 
                onClick={handleAnalyze} 
                loading={isAnalyzing}
              >
                开始分析
              </Button>
            </div>
          </div>
        </TabPane>
        
        <TabPane tab="选择已有专利" key="existing">
          <div style={{ padding: '20px 0' }}>
            <Select
              style={{ width: '100%', marginBottom: '20px' }}
              placeholder="请选择专利"
              options={patentOptions}
              onChange={setSelectedPatent}
            />
            
            <div style={{ textAlign: 'center' }}>
              <Button 
                type="primary" 
                icon={<RobotOutlined />} 
                onClick={handleAnalyze} 
                loading={isAnalyzing}
                disabled={!selectedPatent}
              >
                开始分析
              </Button>
            </div>
          </div>
        </TabPane>
        
        <TabPane tab="输入专利文本" key="text">
          <div style={{ padding: '20px 0' }}>
            <TextArea 
              rows={10} 
              placeholder="请输入专利文本内容"
              value={patentText}
              onChange={(e) => setPatentText(e.target.value)}
            />
            
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Button 
                type="primary" 
                icon={<RobotOutlined />} 
                onClick={handleAnalyze} 
                loading={isAnalyzing}
                disabled={!patentText}
              >
                开始分析
              </Button>
            </div>
          </div>
        </TabPane>
      </Tabs>
      
      {analysisResult && (
        <div style={{ marginTop: '30px' }}>
          <Divider orientation="left">分析结果</Divider>
          
          <Card title="专利摘要" style={{ marginBottom: '20px' }}>
            <p>{analysisResult.summary}</p>
          </Card>
          
          <Card title="关键技术点" style={{ marginBottom: '20px' }}>
            <Space wrap>
              {analysisResult.keyTechnologies.map((tech: string, index: number) => (
                <Tag key={index} color="blue">{tech}</Tag>
              ))}
            </Space>
          </Card>
          
          <Card title="创新点" style={{ marginBottom: '20px' }}>
            <Space wrap>
              {analysisResult.innovations.map((innovation: string, index: number) => (
                <Tag key={index} color="green">{innovation}</Tag>
              ))}
            </Space>
          </Card>
          
          <Card title="法律状态" style={{ marginBottom: '20px' }}>
            <Descriptions column={2}>
              <Descriptions.Item label="状态">{analysisResult.legalStatus.status}</Descriptions.Item>
              <Descriptions.Item label="专利号">{analysisResult.legalStatus.patentNumber}</Descriptions.Item>
              <Descriptions.Item label="申请日期">{analysisResult.legalStatus.applicationDate}</Descriptions.Item>
              <Descriptions.Item label="公开日期">{analysisResult.legalStatus.publicationDate}</Descriptions.Item>
              <Descriptions.Item label="到期日期">{analysisResult.legalStatus.expirationDate}</Descriptions.Item>
            </Descriptions>
          </Card>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button type="primary" icon={<DownloadOutlined />} onClick={handleExport}>
              导出分析结果
            </Button>
          </div>
        </div>
      )}
      
      {isAnalyzing && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Spin size="large" tip="AI正在分析专利文献..." />
        </div>
      )}
    </div>
  )
}

export default AIPage