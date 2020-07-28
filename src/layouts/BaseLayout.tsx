import React from 'react';
import { Layout, Menu } from 'antd';
import styles from './index.less';
import { history } from 'umi';

const { Header, Content } = Layout;

const routes = [
  { path: '/', name: '制作攻略' },
  { path: '/preview', name: '预览攻略' },
  { path: '/poi', name: 'Poi坐标点' },
]

export default ({ children }) => {

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.logo}>旅游攻略</div>
        <Menu theme="dark" mode="horizontal" selectedKeys={[history.location.pathname,]} onClick={({ key }) => history.push(key)}>
          {routes.map(({ path, name }) => (
            <Menu.Item key={path} className={styles.MenuItem}>{name}</Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  )
}