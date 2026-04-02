import React, { useState } from 'react'
import { Card, Button, Table, Select, Checkbox, Space, Divider, message } from 'antd'
import { ColumnWidthOutlined, DownloadOutlined, RefreshOutlined } from '@ant-design/icons'

const { Option } = Select

// 模拟专利数据
const mockPatents = [
  {
    id: '1',
    title: '一种新型太阳能电池',
    applicant: '科技公司A',
    applicationDate: '2023-01-15',
    publicationDate: '2023-07-20',
    abstract: '本发明提供了一种高效太阳能电池，通过优化材料结构提高能量转换效率...',
    technology: '采用新型纳米材料，优化电池结构，提高能量转换效率',
    claims: '1. 一种太阳能电池，包括电极层、光吸收层和缓冲层... 2. 根据权利要求1所述的太阳能电池...',
    family: 'CN123456789, US12345678, EP1234567',
    status: '已公开'
  },
  {
    id: '2',
    title: '智能机器人控制系统',
    applicant: '机器人公司B',
    applicationDate: '2023-03-10',
    publicationDate: '2023-09-15',
    abstract: '本发明涉及一种智能机器人控制系统，实现了自主导航和环境感知...',
    technology: '基于深度学习的环境感知，实时路径规划，多传感器融合',
    claims: '1. 一种机器人控制系统，包括感知模块、决策模块和执行模块... 2. 根据权利要求1所述的控制系统...',
    family: 'CN987654321, JP9876543, KR9876543',
    status: '审查中'
  },
  {
    id: '3',
    title: '新型医药组合物',
    applicant: '医药公司C',
    applicationDate: '2023-05-20',
    publicationDate: '2023-11-25',
    abstract: '本发明提供了一种治疗心血管疾病的新型医药组合物...',
    technology: '包含活性成分A和B，协同作用，提高治疗效果',
    claims: '1. 一种医药组合物，包含成分A和成分B... 2. 根据权利要求1所述的医药组合物...',
    family: 'CN567890123, EU5678901, CA5678901',
    status: '已授权'
  }
]

// 对比维度
const comparisonDimensions = [
  { value: 'title', label: '专利名称' },
  { value: 'applicant', label: '申请人' },
  { value: 'applicationDate', label: '申请日期' },
  { value: 'publicationDate', label: '公开日期' },
  { value: 'abstract', label: '摘要' },
  { value: 'technology', label: '技术方案' },
  { value: 'claims', label: '权利要求' },
  { value: 'family', label: '同族专利' },
  { value: 'status', label: '法律状态' }
]

const ComparisonPage: React.FC = () => {
  const [selectedPatents, setSelectedPatents] = useState<string[]>([])
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([])
  const [comparisonResult, setComparisonResult] = useState<any[]>([])
  const [isComparing, setIsComparing] = useState(false)

  const handlePatentSelect = (values: string[]) => {
    setSelectedPatents(values)
  }

  const handleDimensionSelect = (values: string[]) => {
    setSelectedDimensions(values)
  }

  const handleCompare = () => {
    if (selectedPatents.length < 2) {
      message.warning('请至少选择两个专利进行对比')
      return
    }
    
    if (selectedDimensions.length === 0) {
      message.warning('请至少选择一个对比维度')
      return
    }
    
    setIsComparing(true)
    
    // 模拟对比过程
    setTimeout(() => {
      const result = selectedDimensions.map(dimension => {
        const dimensionInfo = comparisonDimensions.find(d => d.value === dimension)
        const row: any = {
          dimension: dimensionInfo?.label || dimension
        }
        
        selectedPatents.forEach(patentId => {
          const patent = mockPatents.find(p => p.id === patentId)
          if (patent) {
            row[patentId] = patent[dimension as keyof typeof patent]
          }
        })
        
        return row
      })
      
      setComparisonResult(result)
      setIsComparing(false)
      message.success('对比完成')
    }, 1000)
  }

  const handleExport = () => {
    message.success('对比结果已导出')
  }

  const getColumns = () => {
    const columns = [
      {
        title: '对比维度',
        dataIndex: 'dimension',
        key: 'dimension',
        width: 150
      }
    ]
    
    selectedPatents.forEach(patentId => {
      const patent = mockPatents.find(p => p.id === patentId)
      if (patent) {
        columns.push({
          title: patent.title,
          dataIndex: patentId,
          key: patentId,
          render: (text: any) => {
            if (typeof text === 'string' && text.length > 100) {
              return <div style={{ maxHeight: '100px', overflow: 'auto' }}>{text}</div>
            }
            return text
          }
        })
      }
    })
    
    return columns
  }

  return (
    <div className="module-container">
      <h2>对比分析</h2>
      
      <Card title="对比设置" style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '10px' }}>选择要对比的专利</h3>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="请选择至少两个专利进行对比"
            options={mockPatents.map(patent => ({
              value: patent.id,
              label: patent.title
            }))}
            onChange={handlePatentSelect}
            maxTagCount={3}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '10px' }}>选择对比维度</h3>
          <Space wrap>
            {comparisonDimensions.map(dimension => (
              <Checkbox 
                key={dimension.value}
                checked={selectedDimensions.includes(dimension.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedDimensions([...selectedDimensions, dimension.value])
                  } else {
                    setSelectedDimensions(selectedDimensions.filter(d => d !== dimension.value))
                  }
                }}
              >
                {dimension.label}
              </Checkbox>
            ))}
          </Space>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <Button 
            type="primary" 
            icon={<ColumnWidthOutlined />} 
            onClick={handleCompare}
            loading={isComparing}
            disabled={selectedPatents.length < 2 || selectedDimensions.length === 0}
          >
            开始对比
          </Button>
        </div>
      </Card>
      
      {comparisonResult.length > 0 && (
        <div>
          <Divider orientation="left">对比结果</Divider>
          
          <Table 
            columns={getColumns()} 
            dataSource={comparisonResult} 
            rowKey="dimension" 
            scroll={{ x: 'max-content' }}
          />
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button type="primary" icon={<DownloadOutlined />} onClick={handleExport}>
              导出对比结果
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ComparisonPage