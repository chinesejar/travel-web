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

  return (
    <div className={styles.container}>
      <Row justify="space-between">
        <Typography.Title level={4}>控制中心</Typography.Title>
      </Row>
    </div>
  );
};
