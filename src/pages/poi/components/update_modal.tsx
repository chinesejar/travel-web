import React, { useEffect } from 'react';
import { Input, Select, Form, Row, Col, Modal } from 'antd';
import { useDispatch, useSelector } from 'umi';

const { Option } = Select;

export default () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const poi = useSelector(state => state.poi.poi);

  useEffect(() => {
    if (poi) form.setFieldsValue(poi);
  }, [poi]);

  const onFinish = values => {
    form.resetFields();
    onCancel();
  };

  const onCancel = () => {
    dispatch({ type: 'poi/setPoi', payload: null });
  };

  return (
    <>
      <Row justify="center">
        <Col lg={8} md={12} xs={24}></Col>
      </Row>
      <Modal
        visible={!!poi}
        onCancel={onCancel}
        onOk={form.submit}
        okText="添加"
        cancelText="取消"
        title="添加点"
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '标题是必填项' }]}
          >
            <Input placeholder="输入点名，可能是地名、景区名、饭店名等等等等～" />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '起点是必填项' }]}
          >
            <Select placeholder="确定点的类型" allowClear>
              <Option value={0}>景点</Option>
              <Option value={1}>住宿</Option>
              <Option value={2}>餐饮</Option>
              <Option value={3}>其他</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="地址"
            rules={[{ required: true, message: '线路简介是必填项' }]}
          >
            <Input.TextArea placeholder="输入点的详细地址" />
          </Form.Item>
          <Form.Item
            name="lng"
            label="经度"
            rules={[{ required: true, message: '线路简介是必填项' }]}
          >
            <Input placeholder="输入经度" />
          </Form.Item>
          <Form.Item
            name="lat"
            label="纬度"
            rules={[{ required: true, message: '线路简介是必填项' }]}
          >
            <Input placeholder="输入纬度" />
          </Form.Item>
          <Form.Item name="contact_name" label="联系人">
            <Input placeholder="输入联系人～" />
          </Form.Item>
          <Form.Item name="contact_telephone" label="联系电话">
            <Input placeholder="输入联系电话～" />
          </Form.Item>
          <Form.Item name="contact_phone" label="联系手机">
            <Input placeholder="输入联系手机～" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
