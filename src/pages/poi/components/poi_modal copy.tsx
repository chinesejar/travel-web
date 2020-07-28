import React, { useState } from 'react';
import {
  Input,
  Select,
  InputNumber,
  Cascader,
  Form,
  Row,
  Col,
  Button,
  Modal,
} from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { useDispatch } from 'umi';
import cities from '@/utils/cities';

const { Option } = Select;

export default () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const onFinish = (values) => {
    dispatch({
      type: 'make/addRoute',
      payload: values
    });
    form.resetFields();
    setVisible(false);
  };

  return (
    <>
      <Row>
        <Col span={16} offset={4}>
          <Button icon={<PlusOutlined />} type="primary" onClick={() => setVisible(true)}>添加点</Button>
        </Col>
      </Row>
      <Row justify="center">
        <Col lg={8} md={12} xs={24}>
        </Col>
      </Row>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={form.submit}
        okText="添加"
        cancelText="取消"
        title="添加点">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="名称" rules={[{ required: true, message: '标题是必填项' }]}>
            <Input placeholder="输入点名，可能是地名、景区名、饭店名等等等等～" />
          </Form.Item>
          <Form.Item name="type" label="类型" rules={[{ required: true, message: '起点是必填项' }]}>
            <Select
              placeholder="确定点的类型"
              allowClear
            >
              <Option value={0}>景点</Option>
              <Option value={1}>住宿</Option>
              <Option value={2}>餐饮</Option>
              <Option value={3}>其他</Option>
            </Select>
          </Form.Item>
          <Form.Item name="belong" label="省市区" rules={[{ required: true, message: '线路简介是必填项' }]}>
            <Cascader
              defaultValue={['zhejiang', 'hangzhou', 'xihu']}
              options={cities}
            />
          </Form.Item>
          <Form.Item name="address" label="地址" rules={[{ required: true, message: '线路简介是必填项' }]}>
            <Input.TextArea placeholder="输入点的详细地址" />
          </Form.Item>
          <Form.Item name="coordinates" label="坐标" rules={[{ required: true, message: '线路简介是必填项' }]}>
            <Input.Group compact>
              <Input
                style={{
                  width: 100,
                  pointerEvents: 'none',
                }}
                placeholder="经度,纬度"
                disabled
              />
              <Input style={{ width: 120, textAlign: 'center' }} placeholder="经度" />
              <Input
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: 'none',
                }}
                placeholder=","
                disabled
              />
              <Input
                style={{
                  width: 120,
                  textAlign: 'center',
                }}
                placeholder="纬度"
              />
            </Input.Group>
          </Form.Item>
          <Form.Item name="contact_name" label="联系人" rules={[{ required: true, message: '终点是必填项' }]}>
            <Input placeholder="输入联系人～" />
          </Form.Item>
          <Form.Item name="contact_telephone" label="联系电话" rules={[{ required: true, message: '终点是必填项' }]}>
            <Input placeholder="输入联系电话～" />
          </Form.Item>
          <Form.Item name="contact_phone" label="联系手机" rules={[{ required: true, message: '终点是必填项' }]}>
            <Input placeholder="输入联系手机～" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}