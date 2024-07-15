import { Button, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<any>({
    defaultValues: { name: '', password: '' },
  });

  const onSubmit = (data: any) => {
    console.log('onsubmit', data);
    if (data.name === 'admin' && data.password === '12345') {
      navigate('/');
    }
  };

  return (
    <section className='flex h-screen w-screen'>
      <div className='hidden h-screen flex-[4] bg-[#000] md:flex'>
        <img src='../images/login-cover.webp' alt='Welcome' className='h-screen object-cover opacity-85' />
      </div>

      <div className='flex h-full flex-[3] flex-col items-center justify-center gap-3 bg-gray-50 px-4'>
        <p className='text-[36px] font-semibold'>Đăng nhập</p>

        <form className='flex w-3/4 flex-col gap-4 pt-3 lg:w-[420px]' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return <Input placeholder='Tài khoản' size='large' value={value} onChange={onChange} />;
            }}
          />
          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return <Input.Password value={value} placeholder='Mật khẩu' size='large' onChange={onChange} />;
            }}
          />

          <Button type='primary' size='large' onClick={handleSubmit(onSubmit)}>
            Đăng nhập
          </Button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
