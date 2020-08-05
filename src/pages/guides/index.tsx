import React from 'react';
import { Typography, Row, Col, Divider, List, Button } from 'antd';
import styles from './index.less';
import { useDispatch, history } from 'umi';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

export default () => {
  const dispatch = useDispatch();

  const handleCreate = () => {
    dispatch({
      type: 'guides/addGuide',
    });
    // history.push('/guide/make')
  };

  return (
    <div className={styles.container}>
      <Row justify="space-between">
        <Typography.Title level={4}>攻略</Typography.Title>
        <Button type="primary" onClick={handleCreate}>
          创建攻略
        </Button>
      </Row>
      <Row align="middle">
        <Col span={24}>
          <Divider orientation="left">我的攻略</Divider>
        </Col>
        <Col span={24}>
          <List
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <Typography.Text mark>[ITEM]</Typography.Text> {item}
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};
