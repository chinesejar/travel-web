import React from 'react';
import { Row, Col, Typography } from 'antd';
import { ReactComponent as TripSvg } from '@/assets/Trip-rafiki.svg'
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
        <Col span={12}>
          <TripSvg />
        </Col>
      </Row>
    </div>
  )
}
