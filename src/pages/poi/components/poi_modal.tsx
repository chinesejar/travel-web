import React, { useState } from 'react';
import {
  Select,
  Descriptions,
  Row,
  Col,
  Button,
  Modal,
} from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { useRequest } from '@umijs/hooks';
import { searchAmapPois, addPoi } from '@/services/api';
import styles from './poi_modal.less';

const { Option } = Select;

export default () => {
  const [visible, setVisible] = useState(false);
  const [poi, setPoi] = useState(null);
  const { data, loading, run, cancel } = useRequest(searchAmapPois, {
    debounceInterval: 500,
    manual: true
  });
  const addReq = useRequest(addPoi, {
    manual: true
  });

  const handleAddPoi = () => {
    if (poi) {
      const location = poi.location.split(',');
      const data = {
        name: poi.name,
        type: 0,
        address: poi.address,
        province: poi.pname,
        city: poi.cityname,
        district: poi.adname,
        lng: location[0], lat: location[1],
        source: 'amap',
      }
      addReq.run(data);
    }
  }

  return (
    <>
      <Row>
        <Col span={18} offset={3}>
          <Button icon={<PlusOutlined />} type="primary" onClick={() => setVisible(true)}>添加点</Button>
        </Col>
      </Row>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleAddPoi}
        okText="添加"
        cancelText="关闭"
        title="添加点">
        <Select
          showSearch
          placeholder="输入点名，可能是地名、景区名、饭店名等等等等～"
          filterOption={false}
          onSearch={run}
          onBlur={cancel}
          loading={loading}
          style={{ width: '100%' }}
          onChange={(i) => setPoi(data?.pois?.[i])}
        >
          {data && data?.pois?.map((p, i) => <Option key={i} value={i}>{p.name}<br />{p.address}</Option>)}
        </Select>
        {poi && (
          <Descriptions bordered size="small" column={1} className={styles.Result}>
            <Descriptions.Item label="名称" span={1}>{poi.name}</Descriptions.Item>
            <Descriptions.Item label="类型" span={1}>{poi.type}</Descriptions.Item>
            <Descriptions.Item label="省" span={1}>{poi.pname}</Descriptions.Item>
            <Descriptions.Item label="市" span={1}>{poi.cityname}</Descriptions.Item>
            <Descriptions.Item label="区/县" span={1}>{poi.adname}</Descriptions.Item>
            <Descriptions.Item label="坐标" span={1}>{poi.location}</Descriptions.Item>
            <Descriptions.Item label="地址" span={1}>
              {poi.address}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  )
}