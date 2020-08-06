import React, { useEffect } from 'react';
import { Input, Select, Form, Modal } from 'antd';
import { useDispatch, useSelector } from 'umi';
import { useRequest } from '@umijs/hooks';
import { getPois, getPoiTypes } from '@/services/api';
import PicturesWall from './picture_upload';

const { Option } = Select;

export default () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const index = useSelector(state => state.guide.routeIndex);
  const pois = useSelector(state => state.poi.pois);

  const onFinish = values => {
    dispatch({
      type: 'guide/updateRoute',
      payload: { index, poi: values },
    });
    form.resetFields();
    onCancel();
  };

  const onCancel = () => {
    dispatch({ type: 'guide/setRouteIndex', payload: -1 });
  };

  return (
    <>
      <Modal
        visible={index > -1}
        onCancel={onCancel}
        onOk={form.submit}
        okText="添加"
        cancelText="关闭"
        title="添加路线推荐点"
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="id"
            label="推荐点"
            rules={[{ required: true, message: '推荐点是必填项' }]}
          >
            <Select
              placeholder="搜索点"
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear
            >
              {pois.map(poi => (
                <Option key={poi.id} value={poi.id}>
                  {poi.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="线路点简介"
            rules={[{ required: true, message: '线路简介是必填项' }]}
          >
            <Input.TextArea placeholder="简单清晰的介绍一下你的线路点吧～让它变得更有吸引力" />
          </Form.Item>
          <Form.Item name="pictures" label="照片">
            <PicturesWall />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
