import React, { useState } from 'react';
import {
  Input,
  Select,
  InputNumber,
  Form,
  Row,
  Col,
  Button,
  Modal,
} from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { useDispatch } from 'umi';
import { useRequest } from '@umijs/hooks';
import { getPois } from '@/services/api';

const { Option } = Select;

export default () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { data, loading, run, cancel } = useRequest(getPois, {
    debounceInterval: 500,
  });

  const onFinish = (values) => {
    values.start_poi = data.find(d => d.id === values.start_poi);
    values.end_poi = data.find(d => d.id === values.end_poi);
    values.pois = [];
    dispatch({
      type: 'make/addRoute',
      payload: values
    });
    form.resetFields();
    setVisible(false);
  };

  return (
    <>
      <Button icon={<PlusOutlined />} type="primary" block onClick={() => setVisible(true)}>添加线路</Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={form.submit}
        okText="添加"
        cancelText="取消"
        title="添加路线">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label="标题" rules={[{ required: true, message: '标题是必填项' }]}>
            <Input placeholder="定义一个响亮的标题吧～" />
          </Form.Item>
          <Form.Item name="day" label="行程第几天" rules={[{ required: true, message: '行程天数是必填项' }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name="description" label="线路简介" rules={[{ required: true, message: '线路简介是必填项' }]}>
            <Input.TextArea placeholder="简单清晰的介绍一下你的线路吧～让它变得更有吸引力" />
          </Form.Item>
          <Form.Item name="start_poi" label="起点" rules={[{ required: true, message: '起点是必填项' }]}>
            <Select
              placeholder="搜索起点"
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear
            >
              {data && data.map(poi => <Option key={poi.id} value={poi.id}>{poi.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="end_poi" label="终点" rules={[{ required: true, message: '终点是必填项' }]}>
            <Select
              placeholder="搜索终点"
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear
            >
              {data && data.map(poi => <Option key={poi.id} value={poi.id}>{poi.name}</Option>)}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}