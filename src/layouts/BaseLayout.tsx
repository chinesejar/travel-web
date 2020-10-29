import React from 'react';
import { Layout, Menu, Button, Dropdown } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';
import CaretDownOutlined from '@ant-design/icons/CaretDownOutlined';
import HomeOutlined from '@ant-design/icons/HomeOutlined';
import styles from './index.less';
import { history, useSelector, useDispatch } from 'umi';
import DashboardFilled from '@ant-design/icons/DashboardFilled';
import TagFilled from '@ant-design/icons/TagFilled';
import EnvironmentFilled from '@ant-design/icons/EnvironmentFilled';

const { Header, Content, Footer } = Layout;

const routes = [
  { path: '/', icon: <HomeOutlined />, name: '首页' },
  { path: '/dashboard', icon: <DashboardFilled />, name: '控制中心' },
  { path: '/guide', icon: <TagFilled />, name: '攻略' },
  { path: '/poi', icon: <EnvironmentFilled />, name: '坐标点' },
];

export default ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

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
          {(user ? routes : routes.slice(0, 1)).map(({ path, icon, name }) => (
            <Menu.Item key={path} className={styles.MenuItem}>
              {icon} <span>{name}</span>
            </Menu.Item>
          ))}
        </Menu>
        <div className={styles.actions}>
          {user ? (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item onClick={() => history.push('/dashboard')}>
                    控制台
                  </Menu.Item>
                  <Menu.Item onClick={() => dispatch({ type: 'auth/logout' })}>
                    注销
                  </Menu.Item>
                </Menu>
              }
            >
              <div>
                <Button type="link">
                  {user.username}
                  <CaretDownOutlined />
                </Button>
              </div>
            </Dropdown>
          ) : (
            <Button
              icon={<UserOutlined />}
              type="link"
              onClick={() => history.push('/login')}
            ></Button>
          )}
        </div>
      </Header>
      {children}
      <Footer className={styles.footer}>
        <div>©️ 时空路由科技有限公司</div>
        <div>京ICP备14047664号-2</div>
      </Footer>
    </Layout>
  );
};
