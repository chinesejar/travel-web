import React from 'react';
import { Form, Input, Button } from 'antd';
import styles from './index.less';
import { useDispatch } from 'umi';

export default () => {
  const dispatch = useDispatch();

  const onFinish = values => {
    dispatch({ type: 'login/login', payload: { data: values } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '用户名必须输入' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '密码必须输入' }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" block type="primary">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
