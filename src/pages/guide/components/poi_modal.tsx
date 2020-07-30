import React, { useState } from 'react';
import {
  Input,
  Select,
  Form,
  Modal,
} from 'antd';
import { useDispatch, useSelector } from 'umi';
import { useRequest } from '@umijs/hooks';
import { getPois } from '@/services/api';
import { PoiTypes } from '@/utils/types';

const { Option } = Select;

export default () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const index = useSelector(state => state.make.routeIndex);
  const { data, loading, run, cancel } = useRequest(getPois, {
    debounceInterval: 500,
  });

  const onFinish = (values) => {
    values.poi = data.find(d => d.id === values.poi);
    dispatch({
      type: 'make/updateRoute',
      payload: { index, poi: values }
    });
    form.resetFields();
    onCancel();
  };

  const onCancel = () => {
    dispatch({ type: 'make/setRouteIndex', payload: -1 })
  }

  return (
    <>
      <Modal
        visible={index > -1}
        onCancel={onCancel}
        onOk={form.submit}
        okText="添加"
        cancelText="关闭"
        title="添加路线推荐点">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="type" label="点类型" rules={[{ required: true, message: "字段必填" }]}>
            <Select
              placeholder="确定一下点类型"
              allowClear
            >
              {PoiTypes.map((name, i) => <Option value={i}>{name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="poi" label="起点" rules={[{ required: true, message: '起点是必填项' }]}>
            <Select
              placeholder="搜索点"
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear
            >
              {data && data.map(poi => <Option key={poi.id} value={poi.id}>{poi.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="description" label="线路点简介" rules={[{ required: true, message: '线路简介是必填项' }]}>
            <Input.TextArea placeholder="简单清晰的介绍一下你的线路点吧～让它变得更有吸引力" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}