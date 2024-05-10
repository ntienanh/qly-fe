import {
  CaretDownOutlined,
  GiftOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PicLeftOutlined,
  PrinterOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, MenuProps, Space } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import clsx from 'clsx';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const items: MenuProps['items'] = [{ label: <Link to={'/login'}>Logout</Link>, key: '0' }];

const MainLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className='!fixed !duration-300'>
        <div className='h-[64px] bg-white flex justify-center items-center border-r border-gray-100'>
          <Link to={'/'}>
            <img
              src='https://png.pngtree.com/png-clipart/20230116/original/pngtree-online-shopping-logo-desing-png-image_8918925.png'
              alt='logo'
              width={200}
              height={64}
              className={clsx('object-contain h-[64px] w-[200px]', collapsed && 'p-1 transition delay-1000')}
            />
          </Link>
        </div>

        <Menu
          className='!h-screen'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={[
            { key: '1', icon: <HomeOutlined />, label: <Link to={'/'}>Trang chủ</Link> },
            { key: '2', icon: <PrinterOutlined />, label: <Link to={'/'}>Cơ sở vật chất</Link> },
            { key: '3', icon: <PicLeftOutlined />, label: <Link to={'/'}>Phòng ban</Link> },
            { key: '4', icon: <UsergroupAddOutlined />, label: <Link to={'/'}>Nhân viên</Link> },
            { key: '5', icon: <GiftOutlined />, label: <Link to={'/product'}>Sản phẩm</Link> },
          ]}
        />
      </Sider>

      <Layout className={clsx('ml-[200px] h-auto !duration-300', collapsed && 'ml-[80px] !duration-300')}>
        <Header className='p-0 flex justify-between items-center bg-gray-100 shadow-md sticky z-20 top-0 backdrop-blur-[9px] bg-opacity-70'>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className='!w-[64px] h-[64px] !rounded-none'
          />

          <div className='pr-4'>
            <Dropdown menu={{ items }} trigger={['click']}>
              <a onClick={e => e.preventDefault()}>
                <Space>
                  <Avatar icon={<UserOutlined />} />
                  <CaretDownOutlined className='!text-[#BDBDC0]' />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Header>

        <Content className='bg-white p-4 !pb-[64px]'>
          <Outlet />
        </Content>

        <Footer>123</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
