import React from 'react';
import { Card, Space, Row, Col, Button, Typography } from 'antd';
import MinusOutlined from '@ant-design/icons/MinusOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { useDispatch, useSelector } from 'umi';
import styles from './route_list.less';
import PoiModal from './poi_modal';

export default () => {
  const pois = useSelector(state => state.poi.pois);
  const guide = useSelector(state => state.guide.guide);
  const routes = guide.Routes;
  const poiTypes = useSelector(state => state.guide.poiTypes);
  const dispatch = useDispatch();

  return (
    <Row justify="center">
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {routes.map((route, i) => (
            <Card
              key={`route-${i}`}
              title={route.title}
              size="small"
              extra={<span>行程第{route.day}天</span>}
            >
              <Row justify="center">
                <Col className={styles.PoiName}>
                  {pois.find(p => route.start_poi === p.id)?.name}
                </Col>
                <Col className={styles.PoiName}>
                  <MinusOutlined size={40} />
                </Col>
                <Col className={styles.PoiName}>
                  {pois.find(p => route.end_poi === p.id)?.name}
                </Col>
              </Row>
              <div style={{ padding: '4px 0' }}>
                <span>{route.description}</span>
              </div>
              <Row justify="space-between">
                <Col>
                  <Typography.Text strong>推荐点</Typography.Text>
                </Col>
                <Col>
                  <Button
                    size="small"
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() =>
                      dispatch({ type: 'guide/setRouteIndex', payload: i })
                    }
                  >
                    添加
                  </Button>
                </Col>
              </Row>
              {route.Pois?.map(({ id, description }, i) => {
                console.log(id, description);
                const poi = pois.find(p => id === p.id);
                return (
                  <Row style={{ padding: '2px 0' }} key={`poi-${i}`}>
                    <Col span={4}>{poiTypes[poi.type]}</Col>
                    <Col flex={1}>{poi.name}</Col>
                    <Col span="auto">{poi.address}</Col>
                    <Col span={24}>
                      <strong>简介：</strong>
                      {description}
                    </Col>
                  </Row>
                );
              })}
            </Card>
          ))}
        </Space>
      </Col>
      <PoiModal />
    </Row>
  );
};
