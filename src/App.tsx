import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/sections/Footer';
import Header from './components/sections/Header';
import NotFoundPage from './pages/404';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import ProductDetail from './pages/Product/ProductDetail';
import { ConfigProvider } from 'antd';
import NextTopLoader from 'nextjs-toploader';

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <BrowserRouter>
        <Header />
        <main className='mx-auto max-w-[1280px] px-4 xl:px-0 min-h-screen mt-4'>
          <NextTopLoader color='#63AB44' showSpinner={false} />

          <Routes>
            <Route path='/' index element={<Home />} />
            <Route path='product' element={<Product />} />
            <Route path='product/:id' element={<ProductDetail />} />

            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
