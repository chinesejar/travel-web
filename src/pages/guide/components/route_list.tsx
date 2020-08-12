import React from 'react';
import { Card, Space, Row, Col, Button, Typography } from 'antd';
import MinusOutlined from '@ant-design/icons/MinusOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { useDispatch, useSelector } from 'umi';
import styles from './route_list.less';
import PoiModal from './poi_modal';
import config from '@/config';

export default () => {
  const pois = useSelector(state => state.poi.pois);
  const routes = useSelector(state => state.guide.routes);
  const poiTypes = useSelector(state => state.guide.poiTypes);
  const dispatch = useDispatch();

  const handleEditRoute = route => {
    dispatch({
      type: 'guide/setRoute',
      payload: route,
    });
  };

  const handleEditRoutePoi = routePoi => {
    dispatch({
      type: 'guide/setRoutePoi',
      payload: routePoi,
    });
  };

  const handleAddPoi = route => {
    dispatch({
      type: 'guide/addRoutePoi',
      payload: { data: { route_id: route.id } },
    });
  };

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
              actions={[
                <Button onClick={() => handleEditRoute(route)}>编辑</Button>,
              ]}
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
              <Row gutter={[8, 8]}>
                {route.images.map((image, i) => {
                  return (
                    <Col key={`route-image-${i}`}>
                      <img
                        src={`${config.mediaUrl}/route-image/${image.name}`}
                        alt={`image-${i}`}
                        height={80}
                        width={80}
                      />
                    </Col>
                  );
                })}
              </Row>
              <Row justify="space-between">
                <Col>
                  <Typography.Text strong>推荐点</Typography.Text>
                </Col>
                <Col>
                  <Button
                    size="small"
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => handleAddPoi(route)}
                  >
                    添加
                  </Button>
                </Col>
              </Row>
              {route.pois?.map((routePoi, i) => {
                const { poi_id, description, images } = routePoi;
                const poi = pois.find(p => poi_id == p.id);
                return (
                  <Row style={{ padding: '2px 0' }} key={`poi-${i}`}>
                    {poi ? (
                      <>
                        <Col span={4}>{poiTypes?.[poi?.type]}</Col>
                        <Col flex={1}>{poi?.name}</Col>
                        <Col span="auto">{poi?.address}</Col>
                        <Col span={24}>
                          <strong>简介：</strong>
                          {description}
                        </Col>
                        <Row gutter={[8, 8]}>
                          {images?.map((image, i) => {
                            return (
                              <Col key={`poi-image-${i}`}>
                                <img
                                  src={`${config.mediaUrl}/poi-image/${image.name}`}
                                  alt={`poi-image-${i}`}
                                  height={80}
                                  width={80}
                                />
                              </Col>
                            );
                          })}
                        </Row>
                      </>
                    ) : (
                      '该推荐点未完善'
                    )}
                    <Col span={24}>
                      <Button
                        size="small"
                        onClick={() => handleEditRoutePoi(routePoi)}
                      >
                        编辑
                      </Button>
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
