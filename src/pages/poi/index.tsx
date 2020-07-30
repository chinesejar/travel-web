import React, { useState } from 'react';
import {
  Space,
  Table,
  Row,
  Col,
  Button,
  Radio,
} from 'antd';
import { useRequest } from '@umijs/hooks';
import { getPois } from '@/services/api';
import PoiModal from './components/poi_modal';
import UpdateModal from './components/update_modal';
import { useDispatch } from 'umi';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const { data, loading, run, cancel } = useRequest(getPois, {
    debounceInterval: 500,
  });

  return (
    <div className={styles.container}>
      <PoiModal />
      <Row justify="center">
        <Radio.Group
          defaultValue={tab}
          onChange={(e) => setTab(e.target.value)}
          options={[
            { label: '全部', value: 0 },
            { label: '景点', value: 1 },
            { label: '住宿', value: 2 },
            { label: '餐饮', value: 3 },
            { label: '其他', value: 4 },
          ]}
          optionType="button"
          buttonStyle="solid" />
      </Row>
      <Row>
        <Col span={18} offset={3}>
          <Table
            bordered
            className={styles.Table}
            columns={[
              { key: 'id', dataIndex: 'id', title: '主键' },
              { key: 'name', dataIndex: 'name', title: '名称' },
              { key: 'address', dataIndex: 'address', title: '地址' },
              { key: 'province', dataIndex: 'province', title: '省' },
              { key: 'city', dataIndex: 'city', title: '市' },
              { key: 'district', dataIndex: 'district', title: '区' },
              { key: 'lng', dataIndex: 'lng', title: '纬度' },
              { key: 'lat', dataIndex: 'lat', title: '经度' },
              {
                key: 'op', dataIndex: 'op', title: '操作', render: (_, rec) => (
                  <Space>
                    <Button type="primary" size="small" onClick={() => dispatch({ type: 'poi/setPoi', payload: rec })}>修改</Button>
                  </Space>
                )
              },
            ]}
            dataSource={data}
          />
        </Col>
      </Row>
      <UpdateModal />
    </div>
  )
}