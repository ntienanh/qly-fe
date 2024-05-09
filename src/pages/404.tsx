import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className='mx-auto w-full'>
      <Link to={'/'} className=' hover:text-blue-500 transition-colors'>
        Back to home
      </Link>

      <div className='flex justify-center items-center h-full pt-20 '>
        <img src='../images/404.svg' alt='page not found' />
      </div>
    </section>
  );
};

export default NotFoundPage;
