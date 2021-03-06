import React from 'react';
import { Layout, Menu } from 'antd';
import styles from './index.less';
import { history } from 'umi';

export default ({ children }) => {
  return (
    <Layout>
      <Layout.Content className={styles.content}>{children}</Layout.Content>
    </Layout>
  );
};
