import React, { useState, useEffect } from 'react';
import {
  Input,
  Select,
  InputNumber,
  Typography,
  Form,
  Row,
  Col,
  Button,
} from 'antd';
import RouteModal from './components/route_modal';
import RouteList from './components/route_list';
import SendOutlined from '@ant-design/icons/SendOutlined';
import config from '@/config';
import styles from './index.less';
import AMap from 'AMap';
import { useDispatch, useSelector } from 'umi';

const { Option } = Select;
const { mapView } = config;

export default () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [map, setMap] = useState(null);
  const guide = useSelector(state => state.guide.guide);
  if (!guide) return null;
  const routes = guide.routes;
  const guideTypes = useSelector(state => state.guide.guideTypes);

  useEffect(() => {
    let amap = new AMap.Map('map', {
      ...mapView,
      layers: [
        // 卫星
        new AMap.TileLayer.Satellite(),
        // 路网
        // new AMap.TileLayer.RoadNet()
      ],
    });
    setMap(amap);
  }, []);

  useEffect(() => {
    if (routes.length > 0 && map) {
      const points = routes.reduce((cur, next) => {
        const { start_poi, end_poi } = next;
        return cur.concat([
          [start_poi.lng, start_poi.lat],
          [end_poi.lng, end_poi.lat],
        ]);
      }, []);
      AMap.plugin('AMap.Driving', function() {
        var driving = new AMap.Driving({
          // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
          policy: AMap.DrivingPolicy.LEAST_TIME,
          // map 指定将路线规划方案绘制到对应的AMap.Map对象上
          map: map,
        });
        driving.search(
          points[0],
          points[points.length - 1],
          {
            waypoints: points.slice(1, points.length - 2),
          },
          function(status, result) {
            // 未出错时，result即是对应的路线规划方案
            console.log(status, result);
          },
        );
      });
    }
  }, [routes, map]);

  const onFinish = values => {
    values.routes = guide.routes;
    dispatch({
      type: 'guides/putGuide',
      payload: { data: values, param: { id: guide.id } },
    });
  };

  return (
    <Row className={styles.container}>
      <Col className={styles.form} lg={6} sm={12} xs={24}>
        <Form
          form={form}
          layout="vertical"
          initialValues={guide}
          onFinish={onFinish}
        >
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '字段必填' }]}
          >
            <Input placeholder="定义一个响亮的标题吧～" />
          </Form.Item>
          <Form.Item
            name="days"
            label="行程天数"
            rules={[{ required: true, message: '字段必填' }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="description"
            label="攻略简介"
            rules={[{ required: true, message: '字段必填' }]}
          >
            <Input.TextArea placeholder="简单清晰的介绍一下你的攻略吧～让它变得更有吸引力" />
          </Form.Item>
          <Form.Item
            name="type"
            label="所属类型"
            rules={[{ required: true, message: '字段必填' }]}
          >
            <Select
              placeholder="确定一下攻略类型，以便适应不同需求的朋友们"
              allowClear
            >
              {guideTypes.map((type, i) => (
                <Option key={i} value={i}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
        <Row justify="center">
          <Typography.Title level={4}>线路列表</Typography.Title>
        </Row>
        <RouteModal />
        <RouteList />
        <Row justify="center" style={{ marginTop: 16 }}>
          <Button
            icon={<SendOutlined />}
            type="primary"
            block
            onClick={form.submit}
          >
            保存攻略
          </Button>
        </Row>
      </Col>
      <Col flex={1}>
        <div className={styles.map} id="map" />
      </Col>
    </Row>
  );
};
