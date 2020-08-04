import React from 'react';
import { Form, Input, Button } from 'antd';
import styles from './index.less';
import { useDispatch, history } from 'umi';

export default () => {
  const dispatch = useDispatch();

  const onFinish = values => {
    delete values.password2;
    dispatch({ type: 'auth/register', payload: { data: values } });
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
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="password2"
            rules={[
              { required: true, message: '密码必须输入' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('密码不匹配');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" block type="primary">
              注册
            </Button>
            <Button block type="link" onClick={() => history.push('/login')}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
