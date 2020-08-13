import React from 'react';
import {
  Typography,
  Row,
  Col,
  Divider,
  Button,
  Space,
  Table,
  Popconfirm,
} from 'antd';
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
    history.push(`/guide/${guide.id}`);
  };

  const handleDelete = guide => {
    dispatch({
      type: 'guides/removeGuide',
      payload: { param: { id: guide.id } },
    });
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
          <Table
            bordered
            columns={[
              { title: '标题', key: 'title', dataIndex: 'title' },
              { title: '行程天数', key: 'days', dataIndex: 'days' },
              {
                title: '描述',
                key: 'description',
                dataIndex: 'description',
                ellipsis: true,
              },
              {
                title: '路线数',
                key: 'routes',
                dataIndex: 'routes',
                render: item => `${item.length}条`,
              },
              { title: '创建时间', key: 'createAt', dataIndex: 'createdAt' },
              {
                title: '操作',
                key: 'op',
                render: item => {
                  return (
                    <Space>
                      <Button
                        type="primary"
                        size="small"
                        onClick={() => handleEdit(item)}
                      >
                        编辑
                      </Button>
                      <Button type="primary" size="small" disabled>
                        发布
                      </Button>
                      <Popconfirm
                        title="确认删除"
                        okText="确认"
                        cancelText="取消"
                        onConfirm={() => handleDelete(item)}
                      >
                        <Button type="primary" danger size="small">
                          删除
                        </Button>
                      </Popconfirm>
                    </Space>
                  );
                },
              },
            ]}
            dataSource={guides.map(g => Object.assign(g, { key: g.id }))}
          />
        </Col>
      </Row>
    </div>
  );
};
