import React, { useState } from 'react';
import {
  Input,
  Select,
  Card,
  Typography,
  Space,
  Row,
  Col,
  Button,
  Modal,
} from 'antd';
import MinusOutlined from '@ant-design/icons/MinusOutlined';
import { useDispatch, useSelector } from 'umi';
import styles from './route_list.less';

export default () => {
  const routes = useSelector(state => state.make.routes);
  const dispatch = useDispatch();

  return (
    <Row justify="center">
      <Col lg={8} md={12} xs={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {routes.map(route => (
            <Card title={route.title} size="small" extra={<span>行程第{route.day}天</span>}>
              <Row justify="center">
                <Col className={styles.PoiName}>{route.start_poi.name}</Col>
                <Col className={styles.PoiName}>
                  <MinusOutlined size={40} />
                </Col>
                <Col className={styles.PoiName}>{route.end_poi.name}</Col>
              </Row>
              <div style={{ padding: '4px 0' }}>
                <span>{route.description}</span>
              </div>
              <Row justify="end">
                <Space>
                  <Button size="small">景点</Button>
                  <Button size="small">餐饮</Button>
                  <Button size="small">住宿</Button>
                </Space>
              </Row>
            </Card>
          ))}
        </Space>
      </Col>
    </Row>
  )
}