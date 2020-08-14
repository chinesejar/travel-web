import React from 'react';
import { Card, Space, Row, Col, Button, Typography, Popconfirm } from 'antd';
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
  const routePoi = useSelector(state => state.guide.routePoi);
  const dispatch = useDispatch();

  const handleEditRoute = route => {
    dispatch({
      type: 'guide/setRoute',
      payload: route,
    });
  };

  const handleDeleteRoute = route => {
    dispatch({
      type: 'guide/removeRoute',
      payload: { param: { id: route.id } },
    });
  };

  const handleEditRoutePoi = routePoi => {
    dispatch({
      type: 'guide/setRoutePoi',
      payload: routePoi,
    });
  };

  const handleDeleteRoutePoi = routePoi => {
    dispatch({
      type: 'guide/removeRoutePoi',
      payload: { param: { id: routePoi.id } },
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
                <Popconfirm
                  title="确认删除"
                  okText="确认"
                  cancelText="取消"
                  onConfirm={() => handleDeleteRoute(route)}
                >
                  <Button type="primary" danger>
                    删除
                  </Button>
                </Popconfirm>,
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
                  <Card
                    key={`poi-${i}`}
                    style={{ marginTop: 8 }}
                    size="small"
                    title={poi && poi?.name}
                    extra={poi && poiTypes?.[poi?.type]}
                    actions={[
                      <Button
                        size="small"
                        onClick={() => handleEditRoutePoi(routePoi)}
                        type="primary"
                      >
                        编辑
                      </Button>,
                      <Popconfirm
                        title="确认删除"
                        okText="确认"
                        cancelText="取消"
                        onConfirm={() => handleDeleteRoutePoi(routePoi)}
                      >
                        <Button size="small" type="primary" danger>
                          删除
                        </Button>
                      </Popconfirm>,
                    ]}
                  >
                    {poi ? (
                      <>
                        <p>地址：{poi?.address}</p>
                        <p>简介：{description}</p>
                      </>
                    ) : (
                      <Typography.Text type="warning">
                        该推荐点未完善，请编辑
                      </Typography.Text>
                    )}
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
                  </Card>
                );
              })}
            </Card>
          ))}
        </Space>
      </Col>
      {routePoi && <PoiModal />}
    </Row>
  );
};
