import React from 'react';
import { Typography, Row, Col, Divider, List, Button, Space } from 'antd';
import styles from './index.less';
import { useDispatch, history, useSelector } from 'umi';

export default () => {
  const dispatch = useDispatch();
  const guides = useSelector(state => state.guides.guides);

  const handleCreate = () => {
    dispatch({
      type: 'guides/addGuide',
    });
  };

  const handleEdit = guide => {
    dispatch({
      type: 'guide/setGuide',
      payload: guide,
    });
    history.push(`/guide/${guide.id}`);
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
            dataSource={guides}
            renderItem={item => (
              <List.Item>
                <Row>
                  <Col span={4}>
                    <Typography.Text>
                      {item.id} {item.title}
                    </Typography.Text>
                  </Col>
                  <Col span={16}>
                    {item.days}
                    <Typography.Text mark>{item.status}</Typography.Text>
                  </Col>
                  <Col span={4}>
                    <Space>
                      <Button
                        type="primary"
                        size="small"
                        onClick={() => handleEdit(item)}
                      >
                        编辑
                      </Button>
                      <Button type="primary" size="small">
                        发布
                      </Button>
                      <Button type="primary" danger size="small">
                        删除
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};
