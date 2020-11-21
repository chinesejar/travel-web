import React from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'umi';
import Map from './components/Map';
import Route from './components/Route';
import styles from './index.less';
import Meta from './components/Meta';

export default () => {
  const { guide, index } = useSelector(state => state.make);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <Row gutter={12} className={styles.content}>
        <Col>
          <div className={styles.part}>
            <div
              className={styles.item}
              onClick={() => {
                dispatch({
                  type: 'make/setIndex',
                  payload: -1,
                });
              }}
            >
              <div
                className={styles.text}
                style={{
                  backgroundColor: 'yellowgreen',
                }}
              >
                信息
              </div>
            </div>
            {guide.routes.map((_, i) => (
              <div
                className={styles.item}
                key={`guide-${i}`}
                onClick={() => {
                  dispatch({
                    type: 'make/setIndex',
                    payload: i,
                  });
                }}
              >
                <div className={styles.text}>第{i + 1}天</div>
              </div>
            ))}
            <div
              className={styles.item}
              onClick={() => {
                dispatch({
                  type: 'make/addRoute',
                  payload: {
                    content: '',
                    pois: [],
                  },
                });
              }}
            >
              <div className={styles.text}>添加</div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={8} md={6} xl={6} xxl={4}>
          <div className={styles.part} style={{ padding: 5 }}>
            {index === -1 ? <Meta /> : <Route />}
          </div>
        </Col>
        <Col flex="auto">
          <div className={styles.part}>
            <Map />
          </div>
        </Col>
      </Row>
    </div>
  );
};
