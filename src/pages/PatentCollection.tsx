import React, { useState } from 'react'
import { Tabs, Upload, Button, Form, Input, Select, DatePicker, message, Table } from 'antd'
import { InboxOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'

const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input

// 模拟专利数据
const mockPatents = [
  {
    id: '1',
    title: '一种新型太阳能电池',
    applicant: '科技公司A',
    applicationDate: '2023-01-15',
    publicationDate: '2023-07-20',
    abstract: '本发明提供了一种高效太阳能电池，通过优化材料结构提高能量转换效率...',
    status: '已公开'
  },
  {
    id: '2',
    title: '智能机器人控制系统',
    applicant: '机器人公司B',
    applicationDate: '2023-03-10',
    publicationDate: '2023-09-15',
    abstract: '本发明涉及一种智能机器人控制系统，实现了自主导航和环境感知...',
    status: '审查中'
  }
]

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
}

const PatentCollection: React.FC = () => {
  const [form] = Form.useForm()
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    setIsSearching(true)
    // 模拟搜索延迟
    setTimeout(() => {
      setSearchResults(mockPatents)
      setIsSearching(false)
    }, 1000)
  }

  const handleManualSubmit = (values: any) => {
    console.log('手动录入专利数据:', values)
    message.success('专利信息录入成功')
    form.resetFields()
  }

  const columns = [
    {
      title: '专利名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '申请人',
      dataIndex: 'applicant',
      key: 'applicant',
    },
    {
      title: '申请日期',
      dataIndex: 'applicationDate',
      key: 'applicationDate',
    },
    {
      title: '公开日期',
      dataIndex: 'publicationDate',
      key: 'publicationDate',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Button type="link">查看详情</Button>
      ),
    },
  ]

  return (
    <div className="module-container">
      <h2>专利文献收集</h2>
      <Tabs defaultActiveKey="batch">
        <TabPane tab="批量导入" key="batch">
          <div style={{ padding: '20px 0' }}>
            <Upload.Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
              <p className="ant-upload-hint">
                支持上传 PDF、DOC、XLS 等格式文件，单次最多上传 10 个文件
              </p>
            </Upload.Dragger>
          </div>
        </TabPane>
        
        <TabPane tab="在线检索" key="search">
          <Form layout="vertical" onFinish={handleSearch}>
            <Form.Item 
              name="keyword" 
              label="关键词" 
              rules={[{ required: true, message: '请输入关键词' }]}
            >
              <Input placeholder="请输入专利名称、申请人或关键词" />
            </Form.Item>
            
            <Form.Item name="dateRange" label="申请日期范围">
              <DatePicker.RangePicker style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item name="type" label="专利类型">
              <Select placeholder="请选择专利类型">
                <Option value="invention">发明专利</Option>
                <Option value="utility">实用新型</Option>
                <Option value="design">外观设计</Option>
              </Select>
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />} loading={isSearching}>
                搜索
              </Button>
            </Form.Item>
          </Form>
          
          {searchResults.length > 0 && (
            <div className="table-container">
              <Table columns={columns} dataSource={searchResults} rowKey="id" />
            </div>
          )}
        </TabPane>
        
        <TabPane tab="手动录入" key="manual">
          <Form layout="vertical" form={form} onFinish={handleManualSubmit}>
            <Form.Item 
              name="title" 
              label="专利名称" 
              rules={[{ required: true, message: '请输入专利名称' }]}
            >
              <Input placeholder="请输入专利名称" />
            </Form.Item>
            
            <Form.Item 
              name="applicant" 
              label="申请人" 
              rules={[{ required: true, message: '请输入申请人' }]}
            >
              <Input placeholder="请输入申请人" />
            </Form.Item>
            
            <Form.Item 
              name="applicationDate" 
              label="申请日期" 
              rules={[{ required: true, message: '请选择申请日期' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item 
              name="publicationDate" 
              label="公开日期"
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item 
              name="abstract" 
              label="摘要"
            >
              <TextArea rows={4} placeholder="请输入专利摘要" />
            </Form.Item>
            
            <Form.Item 
              name="status" 
              label="法律状态" 
              rules={[{ required: true, message: '请选择法律状态' }]}
            >
              <Select placeholder="请选择法律状态">
                <Option value="pending">审查中</Option>
                <Option value="published">已公开</Option>
                <Option value="granted">已授权</Option>
                <Option value="expired">已失效</Option>
              </Select>
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default PatentCollection