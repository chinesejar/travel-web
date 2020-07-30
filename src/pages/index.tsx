import React from 'react';
import { Row, Col, Typography } from 'antd';
import { ReactComponent as TripSvg } from '@/assets/Trip-rafiki.svg'
import { ReactComponent as Trip1Svg } from '@/assets/Trip-1.svg'
import { ReactComponent as Trip2Svg } from '@/assets/Trip-2.svg'
import { ReactComponent as Trip3Svg } from '@/assets/Trip-3.svg'
import styles from './index.less';

export default () => {
  return (
    <div>
      <Row className={styles.view}>
        <Col span={12} className={styles.viewLeft}>
          <Typography.Title level={2}>
            旅游攻略
          </Typography.Title>
          <Typography.Paragraph>
            做了一个简单的旅游攻略制作网站，还在尝试中，从数据结构、逻辑功能到UI设计，都没有一个明确的目标。这是一个艰巨的任务，都要慢慢摸索。
          </Typography.Paragraph>
        </Col>
        <Col span={12} className={styles.viewLeft}>
          <TripSvg height={400} />
        </Col>
      </Row>
      <Row>
        <Col md={8} sm={24} className={styles.box}>
          <Typography.Title level={4}>GIS 攻略</Typography.Title>
          <Typography.Text>以 GIS 为基础，显示攻略</Typography.Text>
          <Trip1Svg height={300} />
        </Col>
        <Col md={8} sm={24} className={styles.box}>
          <Typography.Title level={4}>智能推荐</Typography.Title>
          <Typography.Text>智能推荐攻略中的景点、住宿、游玩</Typography.Text>
          <Trip2Svg height={300} />
        </Col>
        <Col md={8} sm={24} className={styles.box}>
          <Typography.Title level={4}>深度学习</Typography.Title>
          <Typography.Text>对各个攻略进行深度学习，提高智能化</Typography.Text>
          <Trip3Svg height={300} />
        </Col>
      </Row>
    </div>
  )
}
