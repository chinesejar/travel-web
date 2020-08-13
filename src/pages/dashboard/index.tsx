import React from 'react';
import { Typography, Row, Col, Statistic } from 'antd';
import styles from './index.less';
import { useDispatch, history } from 'umi';

export default () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <Row justify="space-between">
        <Typography.Title level={4}>控制中心</Typography.Title>
      </Row>
      <Row>
        <Typography.Text>更新中</Typography.Text>
      </Row>
    </div>
  );
};
