import React from 'react';
import { Layout } from 'antd';
import styles from './index.less';

export default ({ children }) => {
  return <Layout.Content className={styles.content}>{children}</Layout.Content>;
};
