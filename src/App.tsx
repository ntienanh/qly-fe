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
import { Avatar, Button, ConfigProvider, Dropdown, Layout, Menu, MenuProps, Space } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import clsx from 'clsx';
import NextTopLoader from 'nextjs-toploader';
import React, { createContext } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/404';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import ProductDetail from './pages/Product/ProductDetail';
import ProtectedRoutes from './ProtectedRoutes';
const { Sider, Content, Header } = Layout;

export const UserContext = createContext({} as any);

function App() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [user, setUser] = React.useState({ loggedIn: false });

  const items: MenuProps['items'] = [
    {
      label: <Link to={'/login'}>Logout</Link>,
      key: '0',
    },
  ];

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ConfigProvider>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className='h-[64px] bg-white flex justify-center items-center border-r border-gray-100'>
              <img
                src='https://png.pngtree.com/png-clipart/20230116/original/pngtree-online-shopping-logo-desing-png-image_8918925.png'
                alt='logo'
                width={200}
                height={64}
                className={clsx('object-contain h-[64px] w-[200px]', collapsed && 'p-1 transition delay-1000')}
              />
            </div>

            <Menu
              className='!h-full'
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

          <Layout>
            <Header className='p-0 flex justify-between items-center bg-gray-100 shadow-md'>
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

            <Content className='bg-white'>
              <NextTopLoader color='#1677ff' showSpinner={false} />

              <Routes>
                <Route element={<ProtectedRoutes />}>
                  <Route path='/' element={<Home />} />
                  <Route path='product' element={<Product />} />
                  <Route path='product/:id' element={<ProductDetail />} />
                  <Route path='*' element={<NotFoundPage />} />
                </Route>
              </Routes>

              <Footer className='mt-20 !fixed !bottom-0 !w-full p-6'>Footer</Footer>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </UserContext.Provider>
  );
}

export default App;
