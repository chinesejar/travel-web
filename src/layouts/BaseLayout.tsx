import React from 'react';
import { Layout, Menu, Button } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';
import styles from './index.less';
import { history } from 'umi';

const { Header, Content, Footer } = Layout;

const routes = [
  { path: '/', name: '首页' },
  { path: '/guide', name: '攻略' },
  { path: '/poi', name: '坐标点' },
];

export default ({ children }) => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.logo}>旅游攻略</div>
        <Menu
          className={styles.menus}
          theme="dark"
          mode="horizontal"
          selectedKeys={[history.location.pathname]}
          onClick={({ key }) => history.push(key)}
        >
          {routes.map(({ path, name }) => (
            <Menu.Item key={path} className={styles.MenuItem}>
              {name}
            </Menu.Item>
          ))}
        </Menu>
        <div className={styles.actions}>
          <Button
            icon={<UserOutlined />}
            type="link"
            onClick={() => history.push('/login')}
          ></Button>
        </div>
      </Header>
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footer}>
        <div>©️ 时空路由科技有限公司</div>
        <div>京ICP备14047664号-2</div>
      </Footer>
    </Layout>
  );
};
