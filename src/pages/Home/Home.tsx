import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Card from '../../components/sections/Card';

const Home = () => {
  const productRs = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get('http://localhost:1337/api/products').then(res => res.data),
  });

  const allProductRs = useQuery({
    queryKey: ['product-details'],
    queryFn: () => axios.get('http://localhost:1337/api/product-details').then(res => res.data),
  });

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-6 gap-3'>
        <div className='col-span-2'>
          <Card title='Nhóm vật liệu' total={productRs?.data?.data?.length} />
        </div>

        <div className='col-span-2'>
          <Card title='Tổng vật liệu' total={allProductRs?.data?.data?.length} />
        </div>
      </div>
    </div>
  );
};

export default Home;
