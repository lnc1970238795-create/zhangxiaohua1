import React, { useState } from 'react'
import { Card, Button, Tree, Input, Table, Tag, Modal, Form, Select, message, Space, Divider } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, FilterOutlined, SaveOutlined } from '@ant-design/icons'

const { Option } = Select

// 模拟分类数据
const mockCategories = [
  {
    title: '能源技术',
    key: 'energy',
    children: [
      {
        title: '太阳能',
        key: 'solar',
        children: [
          { title: '太阳能电池', key: 'solar-cell' },
          { title: '太阳能热水器', key: 'solar-water-heater' }
        ]
      },
      {
        title: '风能',
        key: 'wind',
        children: [
          { title: '风力发电', key: 'wind-power' }
        ]
      }
    ]
  },
  {
    title: '人工智能',
    key: 'ai',
    children: [
      {
        title: '机器学习',
        key: 'machine-learning',
        children: [
          { title: '深度学习', key: 'deep-learning' }
        ]
      },
      {
        title: '计算机视觉',
        key: 'computer-vision'
      }
    ]
  }
]

// 模拟专利数据
const mockPatents = [
  {
    id: '1',
    title: '一种新型太阳能电池',
    applicant: '科技公司A',
    applicationDate: '2023-01-15',
    category: 'solar-cell',
    categoryName: '能源技术 > 太阳能 > 太阳能电池'
  },
  {
    id: '2',
    title: '智能机器人控制系统',
    applicant: '机器人公司B',
    applicationDate: '2023-03-10',
    category: 'machine-learning',
    categoryName: '人工智能 > 机器学习'
  },
  {
    id: '3',
    title: '风力发电设备优化',
    applicant: '能源公司C',
    applicationDate: '2023-05-20',
    category: 'wind-power',
    categoryName: '能源技术 > 风能 > 风力发电'
  }
]

const ClassificationPage: React.FC = () => {
  const [categories, setCategories] = useState(mockCategories)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [filteredPatents, setFilteredPatents] = useState(mockPatents)
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false)
  const [isEditCategoryModalVisible, setIsEditCategoryModalVisible] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<any>(null)
  const [newCategory, setNewCategory] = useState({ name: '', parentKey: '' })
  const [form] = Form.useForm()

  const handleCategorySelect = (selectedKeys: React.Key[]) => {
    if (selectedKeys.length > 0) {
      const key = selectedKeys[0] as string
      setSelectedCategory(key)
      // 过滤专利
      const filtered = mockPatents.filter(patent => patent.category === key)
      setFilteredPatents(filtered)
    } else {
      setSelectedCategory('')
      setFilteredPatents(mockPatents)
    }
  }

  const handleAddCategory = () => {
    setNewCategory({ name: '', parentKey: '' })
    setIsAddCategoryModalVisible(true)
  }

  const handleEditCategory = (category: any) => {
    setCurrentCategory(category)
    setNewCategory({ name: category.title, parentKey: category.key })
    setIsEditCategoryModalVisible(true)
  }

  const handleDeleteCategory = (categoryKey: string) => {
    // 模拟删除分类
    message.success('分类删除成功')
  }

  const handleAddCategorySubmit = () => {
    // 模拟添加分类
    message.success('分类添加成功')
    setIsAddCategoryModalVisible(false)
  }

  const handleEditCategorySubmit = () => {
    // 模拟编辑分类
    message.success('分类编辑成功')
    setIsEditCategoryModalVisible(false)
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
      title: '分类',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />}>编辑</Button>
          <Button type="link" icon={<DeleteOutlined />} danger>删除</Button>
        </Space>
      ),
    },
  ]

  const renderTreeNodes = (data: any[]) => {
    return data.map((item) => {
      return (
        <Tree.TreeNode
          key={item.key}
          title={
            <Space>
              {item.title}
              <Button 
                type="text" 
                icon={<EditOutlined />} 
                size="small" 
                onClick={() => handleEditCategory(item)}
              />
              <Button 
                type="text" 
                icon={<DeleteOutlined />} 
                size="small" 
                danger 
                onClick={() => handleDeleteCategory(item.key)}
              />
            </Space>
          }
        >
          {item.children && item.children.length > 0 && renderTreeNodes(item.children)}
        </Tree.TreeNode>
      )
    })
  }

  return (
    <div className="module-container">
      <h2>分类整理</h2>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <Card title="分类体系" style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>自定义分类</h3>
            <Button type="primary" icon={<PlusOutlined />} size="small" onClick={handleAddCategory}>
              添加分类
            </Button>
          </div>
          <Tree
            showLine
            onSelect={handleCategorySelect}
            selectedKeys={selectedCategory ? [selectedCategory] : []}
          >
            {renderTreeNodes(categories)}
          </Tree>
        </Card>
        
        <Card title="专利列表" style={{ flex: 2 }}>
          <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>专利文献</h3>
            <Button icon={<FilterOutlined />} size="small">
              高级筛选
            </Button>
          </div>
          <Table columns={columns} dataSource={filteredPatents} rowKey="id" />
        </Card>
      </div>
      
      {/* 添加分类模态框 */}
      <Modal
        title="添加分类"
        open={isAddCategoryModalVisible}
        onOk={handleAddCategorySubmit}
        onCancel={() => setIsAddCategoryModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="分类名称" required>
            <Input 
              placeholder="请输入分类名称" 
              value={newCategory.name} 
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="父分类">
            <Select 
              placeholder="请选择父分类" 
              style={{ width: '100%' }}
              value={newCategory.parentKey}
              onChange={(value) => setNewCategory({ ...newCategory, parentKey: value })}
            >
              <Option value="">顶级分类</Option>
              {categories.map(category => (
                <Option key={category.key} value={category.key}>{category.title}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      
      {/* 编辑分类模态框 */}
      <Modal
        title="编辑分类"
        open={isEditCategoryModalVisible}
        onOk={handleEditCategorySubmit}
        onCancel={() => setIsEditCategoryModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="分类名称" required>
            <Input 
              placeholder="请输入分类名称" 
              value={newCategory.name} 
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ClassificationPage