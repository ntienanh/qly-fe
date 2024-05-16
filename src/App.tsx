import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import NextTopLoader from 'nextjs-toploader';
import React, { createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/404';
import AllProduct from './pages/AllProduct';
import AllProductDetail from './pages/AllProduct/AllProductDetail';
import Home from './pages/Home/Home';
import LoginPage from './pages/Login';
import Product from './pages/Product/Product';

export const UserContext = createContext({} as any);
const queryClient = new QueryClient();

function App() {
  const [user, setUser] = React.useState({ loggedIn: false });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <NextTopLoader color='#1677ff' showSpinner={false} />

        <ConfigProvider>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route element={<MainLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='product' element={<Product />} />
                <Route path='product_details' element={<AllProduct />} />
                <Route path='product_details/:id' element={<AllProductDetail />} />
              </Route>
            </Route>

            <Route path='/login' element={<LoginPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </ConfigProvider>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}

export default App;
