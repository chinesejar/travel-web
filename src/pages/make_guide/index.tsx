import React, { useState } from 'react';
import {
  Input,
  Select,
  InputNumber,
  Typography,
  Form,
  Row,
  Col,
  Button,
  Modal,
} from 'antd';
import RouteModal from './components/route_modal';
import RouteList from './components/route_list';
import SendOutlined from '@ant-design/icons/SendOutlined';

const { Option } = Select;

const layout = {
  labelCol: { lg: 8, md: 6 },
  wrapperCol: { lg: 8, md: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default () => {
  const [form] = Form.useForm();
  const [routeModal, setRouteModal] = useState(false);

  return (
    <div>
      <Row justify="center">
        <Typography.Title level={4}>制作攻略</Typography.Title>
      </Row>
      <Form {...layout} form={form}>
        <Form.Item name="title" label="标题" rules={[{ required: true, message: "字段必填" }]}>
          <Input placeholder="定义一个响亮的标题吧～" />
        </Form.Item>
        <Form.Item name="days" label="行程天数" rules={[{ required: true, message: "字段必填" }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="description" label="攻略简介" rules={[{ required: true, message: "字段必填" }]}>
          <Input.TextArea placeholder="简单清晰的介绍一下你的攻略吧～让它变得更有吸引力" />
        </Form.Item>
        <Form.Item name="type" label="所属类型" rules={[{ required: true, message: "字段必填" }]}>
          <Select
            placeholder="确定一下攻略类型，以便适应不同需求的朋友们"
            allowClear
          >
            <Option value={0}>生态休闲</Option>
            <Option value={1}>文化古迹</Option>
            <Option value={2}>宗教朝圣</Option>
          </Select>
        </Form.Item>
      </Form>
      <Row justify="center">
        <Typography.Title level={4}>线路列表</Typography.Title>
      </Row>
      <RouteModal />
      <RouteList />
      <Row justify="center" style={{ marginTop: 16 }}>
        <Col lg={8} md={12} xs={24}>
          <Button icon={<SendOutlined />} type="primary" block onClick={form.submit}>保存攻略</Button>
        </Col>
      </Row>
    </div>
  )
}