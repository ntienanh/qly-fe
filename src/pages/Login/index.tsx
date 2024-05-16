import { Button, Input } from 'antd';

const LoginPage = (props: any) => {
  const { setIsLoggedIn } = props;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <section className='flex h-screen w-screen'>
      <div className='hidden h-screen flex-[4] bg-[#000] md:flex'>
        <img src='../images/login.webp' alt='Welcome' className='h-screen object-cover opacity-85' />
      </div>

      <div className='flex h-full flex-[3] flex-col items-center justify-center gap-3 bg-gray-50 px-4'>
        <p className='text-[36px] font-semibold'>Đăng nhập</p>

        <form className='flex w-3/4 flex-col gap-4 pt-3 lg:w-[420px]'>
          <Input placeholder='Tài khoản' size='large' />
          <Input.Password placeholder='Mật khẩu' size='large' />

          <Button type='primary' size='large' onClick={handleSubmit}>
            Đăng nhập
          </Button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
