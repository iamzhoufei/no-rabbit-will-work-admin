import React from 'react';
import { Card } from 'antd';
import { Line, Pie } from '@ant-design/charts';

import Overview from './components/overview';

import styles from './styles/index.less';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

const HomeComponent = (): React.ReactNode => {
  const l2dConfig = {
    model: {
      jsonPath: 'https://wecip.oss-cn-hangzhou.aliyuncs.com/kaji/hijiki.model.json', // xxx.model.json 的路径
    },
    display: {
      superSample: 1, // 超采样等级
      width: 210, // canvas的宽度
      height: 240, // canvas的高度
      position: 'right', // 显示位置：左或右
      hOffset: 0, // canvas水平偏移
      vOffset: 0, // canvas垂直偏移
    },
    mobile: {
      show: true, // 是否在移动设备上显示
      scale: 1, // 移动设备上的缩放
      motion: true, // 移动设备是否开启重力感应
    },
    react: {
      opacityDefault: 1, // 默认透明度
      opacityOnHover: 1, // 鼠标移上透明度
    },
  };

  const data = [
    { month: '5月', value: 105 },
    { month: '6月', value: 4.9 },
    { month: '7月', value: 6 },
    { month: '8月', value: 7 },
    { month: '9月', value: 9 },
    { month: '10月', value: 13 },
  ];
  const config = {
    data,
    height: 400,
    xField: 'month',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    legend: {
      title: {
        text: '测试的',
      },
    },
  };

  const pieData = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];

  const pirConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
  };

  // window.onload = function () {
  //   (window as any)?.L2Dwidget?.init(l2dConfig);
  // };
  return (
    <div>
      <div
        style={{
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Overview title="总访问量">
          <div className={styles.overviewCount}>1234</div>
          <div>
            比昨天下降 86 <CaretDownOutlined style={{ color: 'lightseagreen' }} />
          </div>
        </Overview>

        <Overview title="日访问量">
          <div className={styles.overviewCount}>1234</div>
          <div>
            比昨天上升 123 <CaretUpOutlined style={{ color: 'crimson' }} />
          </div>
        </Overview>

        <Overview title="访问IP来源统计">
          <div className={styles.overviewText}>1、中国 浙江省 杭州市 西湖区</div>
          <div className={styles.overviewText}>2、中国 浙江省 杭州市 西湖区</div>
          <div className={styles.overviewText}>3、中国 浙江省 杭州市 西湖区</div>
        </Overview>

        <Overview title="访问时间统计">
          <div className={styles.overviewText}>1、深夜 12点 ~ 5点</div>
          <div className={styles.overviewText}>2、下午 14点 ~ 18点</div>
          <div className={styles.overviewText}>3、中午 11点 ~ 1点</div>
        </Overview>
      </div>
      <Card>
        <div style={{ display: 'flex', marginBottom: 20, fontWeight: 'bold' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>月度访问量统计</div>
          <div style={{ flex: 1, textAlign: 'center' }}>总访问量构成</div>
        </div>
        <div style={{ display: 'flex' }}>
          <Line style={{ width: '50%' }} {...config} />
          <Pie style={{ width: '50%' }} {...pirConfig} />
        </div>
      </Card>
    </div>
  );
};

export default HomeComponent;
