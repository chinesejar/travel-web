import React from 'react';
import { Layout, Menu } from 'antd';
import DashboardFilled from '@ant-design/icons/DashboardFilled';
import TagFilled from '@ant-design/icons/TagFilled';
import EnvironmentFilled from '@ant-design/icons/EnvironmentFilled';
import styles from './index.less';
import { history } from 'umi';

const routes = [
  { path: '/dashboard', icon: <DashboardFilled />, name: '控制中心' },
  { path: '/guide', icon: <TagFilled />, name: '攻略' },
  { path: '/poi', icon: <EnvironmentFilled />, name: '坐标点' },
];

export default ({ children }) => {
  return (
    <Layout>
      <Layout.Sider collapsed>
        <Menu
          theme="dark"
          selectedKeys={[history.location.pathname]}
          onClick={({ key }) => history.push(key)}
        >
          {routes.map(({ path, icon, name }) => (
            <Menu.Item key={path}>
              {icon} <span>{name}</span>
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
      <Layout.Content className={styles.content}>{children}</Layout.Content>
    </Layout>
  );
};
