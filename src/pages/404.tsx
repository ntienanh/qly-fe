import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className='mx-auto w-full'>
      <Link to={'/'} className=' transition-colors hover:text-blue-500'>
        Back to home
      </Link>

      <div className='flex h-full items-center justify-center pt-20 '>
        <img src='../images/404.svg' alt='page not found' />
      </div>
    </section>
  );
};

export default NotFoundPage;
