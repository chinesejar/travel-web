import React, { useState } from 'react';
import {
  Row,
  Col,
  Upload,
  Modal,
  Card,
  Button,
  Typography,
  Space,
  Input,
} from 'antd';
import {
  EditOutlined,
  FileTextOutlined,
  TagOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'umi';
import { ReactComponent as ScenicIcon } from '@/assets/scenic.svg';
import { ReactComponent as RestaurantIcon } from '@/assets/restaurant.svg';
import { ReactComponent as ShopIcon } from '@/assets/shop.svg';
import styles from '../index.less';

export default function Route() {
  const { guide, index } = useSelector(state => state.make);
  const route = guide.routes[index];
  const dispatch = useDispatch();
  const [modalIndex, setModalIndex] = useState(null);
  const [images, setImages] = useState([]);

  return (
    <>
      <Row align="middle">
        <FileTextOutlined style={{ fontSize: '1.3em' }} />
        <Typography.Text style={{ fontSize: '1.3em' }}>描述</Typography.Text>
      </Row>
      <Input.TextArea
        style={{
          margin: '2px 0',
        }}
        placeholder="添加描述"
        value={route.content}
        onChange={e => {
          dispatch({
            type: 'make/setRoute',
            payload: {
              content: e.target.value,
            },
          });
        }}
      />
      <Row align="middle">
        <TagOutlined style={{ fontSize: '1.3em' }} />
        <Typography.Text style={{ fontSize: '1.3em' }}>经点</Typography.Text>
      </Row>
      <div>
        {route.pois.map(({ poi, content, images }, i) => (
          <Card
            key={`poi-${i}`}
            size="small"
            title={poi.name}
            style={{
              margin: '2px 0',
            }}
            extra={[
              <Space>
                <Button
                  shape="circle"
                  type="primary"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setModalIndex(i);
                  }}
                />
                <Button
                  shape="circle"
                  type="primary"
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    dispatch({
                      type: 'make/removePoi',
                      payload: i,
                    });
                  }}
                />
              </Space>,
            ]}
          >
            <span>{poi.address}</span>
            <br />
            <Typography.Text strong>{content}</Typography.Text>
          </Card>
        ))}
      </div>
      <Modal
        visible={modalIndex !== null}
        title="完善点"
        okText="保存"
        cancelText="取消"
        onCancel={() => setModalIndex(null)}
      >
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Input.TextArea
            placeholder={`对 ${route.pois[modalIndex]?.poi.name} 的描述`}
            onChange={e => {
              dispatch({
                type: 'make/setPoi',
                payload: {
                  content: e.target.value,
                },
              });
            }}
          />
          <Upload listType="picture-card" fileList={images}>
            {images.length > 8 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传图片</div>
              </div>
            )}
          </Upload>
        </Space>
      </Modal>
    </>
  );
}
