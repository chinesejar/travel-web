import React, { useState } from 'react';
import {
  Card,
  Space,
  Row,
  Col,
  Button,
  Typography,
} from 'antd';
import MinusOutlined from '@ant-design/icons/MinusOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { useDispatch, useSelector } from 'umi';
import styles from './route_list.less';
import PoiModal from './poi_modal';
import { PoiTypes } from '@/utils/types';

export default () => {
  const routes = useSelector(state => state.make.routes);
  const dispatch = useDispatch();

  return (
    <Row justify="center">
      <Col lg={8} md={12} xs={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {routes.map((route, i) => (
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
              <Row justify="space-between">
                <Col>
                  <Typography.Text strong>
                    推荐点
                  </Typography.Text>
                </Col>
                <Col>
                  <Button
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() => dispatch({ type: 'make/setRouteIndex', payload: i })}
                  >添加</Button>
                </Col>
              </Row>
              {route.pois.map(poi => (
                <Row style={{ padding: '2px 0' }}>
                  <Col span={4}>{PoiTypes[poi.type]}</Col>
                  <Col flex={1}>{poi.poi.name}</Col>
                  <Col span="auto">{poi.poi.address}</Col>
                  <Col span={24}><strong>简介：</strong>{poi.description}</Col>
                </Row>
              ))}
            </Card>
          ))}
        </Space>
      </Col>
      <PoiModal />
    </Row>
  )
}