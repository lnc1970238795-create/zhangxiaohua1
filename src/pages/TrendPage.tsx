import React, { useState, useEffect } from 'react'
import { Card, Button, Select, DatePicker, Divider, message, Space, Statistic } from 'antd'
import { TrendingUpOutlined, DownloadOutlined, BarChartOutlined, LineChartOutlined, PieChartOutlined } from '@ant-design/icons'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Line, Bar, Pie } from 'react-chartjs-2'

const { Option } = Select
const { RangePicker } = DatePicker

// 注册Chart.js组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

// 模拟专利趋势数据
const mockTrendData = {
  years: ['2020', '2021', '2022', '2023', '2024'],
  technology: {
    '人工智能': [120, 150, 180, 220, 250],
    '新能源': [80, 100, 130, 160, 190],
    '生物医药': [90, 110, 140, 170, 200],
    '新材料': [70, 90, 120, 150, 180]
  },
  applicants: {
    '科技公司A': [30, 40, 50, 60, 70],
    '科技公司B': [25, 35, 45, 55, 65],
    '研究机构C': [20, 25, 30, 35, 40],
    '大学D': [15, 20, 25, 30, 35]
  },
  legalStatus: {
    '已公开': 45,
    '已授权': 30,
    '审查中': 20,
    '已失效': 5
  }
}

const TrendPage: React.FC = () => {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line')
  const [selectedField, setSelectedField] = useState<string>('technology')
  const [dateRange, setDateRange] = useState<any>(null)
  const [chartData, setChartData] = useState<any>(null)
  const [analysisReport, setAnalysisReport] = useState<string>('')

  useEffect(() => {
    generateChartData()
  }, [chartType, selectedField, dateRange])

  const generateChartData = () => {
    if (selectedField === 'technology' || selectedField === 'applicants') {
      const labels = mockTrendData.years
      const datasets = Object.entries(mockTrendData[selectedField as keyof typeof mockTrendData]).map(([key, value]) => ({
        label: key,
        data: value as number[],
        borderColor: getRandomColor(),
        backgroundColor: getRandomColor(0.2),
        tension: 0.1
      }))

      setChartData({
        labels,
        datasets
      })
    } else if (selectedField === 'legalStatus') {
      const labels = Object.keys(mockTrendData.legalStatus)
      const data = Object.values(mockTrendData.legalStatus)
      const backgroundColor = labels.map(() => getRandomColor())

      setChartData({
        labels,
        datasets: [{
          data,
          backgroundColor
        }]
      })
    }

    // 生成分析报告
    generateAnalysisReport()
  }

  const generateAnalysisReport = () => {
    let report = ''
    
    if (selectedField === 'technology') {
      report = '根据专利申请数据，人工智能领域的专利申请量呈现持续增长趋势，从2020年的120件增长到2024年的250件，增长率超过100%。新能源和生物医药领域也保持稳定增长，分别增长了137.5%和122.2%。新材料领域增长相对较慢，但也有显著提升。'
    } else if (selectedField === 'applicants') {
      report = '科技公司A在专利申请方面领先，从2020年的30件增长到2024年的70件，保持了稳定的增长势头。科技公司B紧随其后，申请量持续增加。研究机构和大学的专利申请量相对较少，但也呈现稳步上升趋势。'
    } else if (selectedField === 'legalStatus') {
      report = '在当前专利库中，已公开的专利占比最高，达到45%，已授权专利占30%，审查中的专利占20%，已失效的专利占5%。这表明大部分专利处于活跃状态，具有较高的技术价值。'
    }

    setAnalysisReport(report)
  }

  const getRandomColor = (alpha: number = 1) => {
    const colors = [
      `rgba(255, 99, 132, ${alpha})`,
      `rgba(54, 162, 235, ${alpha})`,
      `rgba(255, 206, 86, ${alpha})`,
      `rgba(75, 192, 192, ${alpha})`,
      `rgba(153, 102, 255, ${alpha})`,
      `rgba(255, 159, 64, ${alpha})`
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const handleExport = () => {
    message.success('趋势分析报告已导出')
  }

  const renderChart = () => {
    if (!chartData) return null

    if (chartType === 'pie') {
      return <Pie data={chartData} />
    } else if (chartType === 'bar') {
      return <Bar data={chartData} />
    } else {
      return <Line data={chartData} />
    }
  }

  return (
    <div className="module-container">
      <h2>趋势分析</h2>
      
      <Card title="分析设置" style={{ marginBottom: '20px' }}>
        <Space wrap style={{ marginBottom: '20px' }}>
          <div>
            <span style={{ marginRight: '10px' }}>分析维度：</span>
            <Select 
              value={selectedField}
              onChange={setSelectedField}
              style={{ width: 150 }}
            >
              <Option value="technology">技术领域</Option>
              <Option value="applicants">申请人</Option>
              <Option value="legalStatus">法律状态</Option>
            </Select>
          </div>
          
          <div>
            <span style={{ marginRight: '10px' }}>图表类型：</span>
            <Select 
              value={chartType}
              onChange={(value) => setChartType(value as any)}
              style={{ width: 150 }}
            >
              <Option value="line">折线图</Option>
              <Option value="bar">柱状图</Option>
              <Option value="pie">饼图</Option>
            </Select>
          </div>
          
          <div>
            <span style={{ marginRight: '10px' }}>时间范围：</span>
            <RangePicker onChange={setDateRange} />
          </div>
        </Space>
      </Card>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <Card title="趋势图表" style={{ flex: 2 }}>
          <div style={{ height: '400px' }}>
            {renderChart()}
          </div>
        </Card>
        
        <Card title="数据分析" style={{ flex: 1 }}>
          <div style={{ marginBottom: '20px' }}>
            <Statistic title="总专利数" value={500} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Statistic title="年增长率" value={25} suffix="%" />
          </div>
          <div>
            <Statistic title="活跃专利" value={475} />
          </div>
        </Card>
      </div>
      
      <Card title="分析报告" style={{ marginBottom: '20px' }}>
        <p>{analysisReport}</p>
      </Card>
      
      <div style={{ textAlign: 'center' }}>
        <Button type="primary" icon={<DownloadOutlined />} onClick={handleExport}>
          导出分析报告
        </Button>
      </div>
    </div>
  )
}

export default TrendPage