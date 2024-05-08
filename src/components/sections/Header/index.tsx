import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='sticky top-0 z-50 bg-[#ffffff] bg-opacity-80 backdrop-blur-[9px] shadow-md'>
      <div className='mx-auto flex h-[72px] max-w-[1280px] justify-between items-center px-4 xl:px-0'>
        <img
          src='https://png.pngtree.com/png-clipart/20230116/original/pngtree-online-shopping-logo-desing-png-image_8918925.png'
          alt='logo'
          width={160}
          height={75}
          className='object-contain h-[75px] overflow-hidden'
        />

        <nav className='flex gap-3 *:font-medium'>
          <Link to={'/'} className='hover:text-green-500 transition-colors hover:underline'>
            Home
          </Link>
          <Link to={'/about'} className='hover:text-green-500 transition-colors hover:underline'>
            About
          </Link>
          <Link to={'/product'} className='hover:text-green-500 transition-colors hover:underline'>
            Product
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
