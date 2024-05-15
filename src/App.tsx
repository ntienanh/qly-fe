import { ConfigProvider } from 'antd';
import NextTopLoader from 'nextjs-toploader';
import React, { createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/404';
import Home from './pages/Home/Home';
import LoginPage from './pages/Login';
import Product from './pages/Product/Product';
import ProductDetail from './pages/Product/ProductDetail';
import Supplies from './pages/Supplies';

export const UserContext = createContext({} as any);

function App() {
  const [user, setUser] = React.useState({ loggedIn: false });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NextTopLoader color='#1677ff' showSpinner={false} />

      <ConfigProvider>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route element={<MainLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/supplies' element={<Supplies />} />
              <Route path='product' element={<Product />} />
              <Route path='product/:id' element={<ProductDetail />} />
            </Route>
          </Route>

          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </ConfigProvider>
    </UserContext.Provider>
  );
}

export default App;
