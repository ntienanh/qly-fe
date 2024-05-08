import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className='mx-auto max-w-[1280px]'>
      <Link to={'/'} className='pl-7 hover:text-blue-500 transition-colors'>
        Back to home
      </Link>

      <div className='flex justify-center items-center h-full pt-20 '>
        <img src='./images/404.svg' alt='page not found' />
      </div>
    </section>
  );
};

export default NotFoundPage;
