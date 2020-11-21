import React from 'react';
import { Row, Typography, Input } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'umi';
import styles from '../index.less';

export default function Meta() {
  const { guide } = useSelector(state => state.make);
  const dispatch = useDispatch();

  return (
    <>
      <Row align="middle">
        <FileTextOutlined style={{ fontSize: '1.3em' }} />
        <Typography.Text style={{ fontSize: '1.3em' }}>
          攻略标题
        </Typography.Text>
      </Row>
      <Input
        style={{
          margin: '2px 0',
        }}
        placeholder="添加标题"
        value={guide.title}
        onChange={e => {
          dispatch({
            type: 'make/setGuide',
            payload: {
              title: e.target.value,
            },
          });
        }}
      />
      <Row align="middle">
        <FileTextOutlined style={{ fontSize: '1.3em' }} />
        <Typography.Text style={{ fontSize: '1.3em' }}>
          攻略描述
        </Typography.Text>
      </Row>
      <Input.TextArea
        style={{
          margin: '2px 0',
        }}
        placeholder="添加描述"
        value={guide.content}
        onChange={e => {
          dispatch({
            type: 'make/setGuide',
            payload: {
              content: e.target.value,
            },
          });
        }}
      />
    </>
  );
}
