const LoginPage = () => {
  return (
    <div className='px-4 flex flex-col justify-center items-center mx-auto max-w-[1280px] h-screen'>
      <div className='px-4 flex h-[500px] justify-center items-center gap-5 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] rounded-[50px]'>
        <div className='flex-[9]'>
          <img src='../images/login.svg' alt='page not found' />
        </div>

        <div className='bg-slate-200 flex-[10]'>Login form</div>
      </div>
    </div>
  );
};

export default LoginPage;
