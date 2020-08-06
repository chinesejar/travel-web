import React, { useState } from 'react';
import { Select, Descriptions, Row, Col, Space, Button, Modal } from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { debounce } from 'lodash';
import config from '@/config';
import { useSelector, useDispatch } from 'umi';
import styles from './poi_modal.less';

const { amapKey } = config;
const { Option } = Select;

export default () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState(0);
  const [poi, setPoi] = useState(null);
  const poiTypes = useSelector(state => state.guide.poiTypes);
  const [pois, setPois] = useState([]);

  const handleSearch = value => {
    fetch(
      `https://restapi.amap.com/v3/place/text?key=${amapKey}&keywords=${value}`,
    )
      .then(res => res.json())
      .then(data => {
        setPois(data.pois);
      })
      .catch(err => console.log(err));
  };

  const handleAddPoi = () => {
    if (poi) {
      const location = poi.location.split(',');
      const data = {
        name: poi.name,
        type,
        address: poi.address.length === 0 ? '' : poi.address,
        province: poi.pname,
        city: poi.cityname,
        district: poi.adname,
        geometry: {
          type: 'Point',
          coordinates: location,
        },
        source: 'amap',
      };
      dispatch({
        type: 'poi/addPoi',
        payload: { data },
      });
    }
  };

  return (
    <>
      <Row>
        <Col span={18} offset={3}>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setVisible(true)}
          >
            添加点
          </Button>
        </Col>
      </Row>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleAddPoi}
        okText="添加"
        cancelText="关闭"
        title="添加点"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Select
            placeholder="选择点类型"
            style={{ width: '100%' }}
            onChange={setType}
            value={type}
          >
            {poiTypes.map((name, i) => (
              <Option key={i} value={i}>
                {name}
              </Option>
            ))}
          </Select>
          <Select
            showSearch
            placeholder="输入点名，可能是地名、景区名、饭店名等等等等～"
            filterOption={false}
            onSearch={debounce(handleSearch, 500)}
            style={{ width: '100%' }}
            onChange={i => setPoi(pois[i])}
          >
            {pois?.map((p, i) => (
              <Option key={i} value={i}>
                {p.name}
                <br />
                {p.address}
              </Option>
            ))}
          </Select>
        </Space>
        {poi && (
          <Descriptions
            bordered
            size="small"
            column={1}
            className={styles.Result}
          >
            <Descriptions.Item label="名称" span={1}>
              {poi.name}
            </Descriptions.Item>
            <Descriptions.Item label="类型" span={1}>
              {poi.type}
            </Descriptions.Item>
            <Descriptions.Item label="省" span={1}>
              {poi.pname}
            </Descriptions.Item>
            <Descriptions.Item label="市" span={1}>
              {poi.cityname}
            </Descriptions.Item>
            <Descriptions.Item label="区/县" span={1}>
              {poi.adname}
            </Descriptions.Item>
            <Descriptions.Item label="坐标" span={1}>
              {poi.location}
            </Descriptions.Item>
            <Descriptions.Item label="地址" span={1}>
              {poi.address}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};
