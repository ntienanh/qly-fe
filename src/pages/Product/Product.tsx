/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Divider, Input, Modal, Select, Space, Table, Tooltip, Upload } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const Product = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [createDetails, setCreateDetails] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const { control, handleSubmit, reset, setValue } = useForm<any>({
    defaultValues: { name: '', images: [], product_details: [] },
  });

  const { isLoading, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get('http://localhost:1337/api/products?populate=*').then(res => res.data),
  });

  const rsAllProducts = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get('http://localhost:1337/api/products-details').then(res => res.data),
  });

  const allProducts = rsAllProducts?.data?.data.map((item: any) => {
    const { id, attributes } = item;
    return { id, ...attributes };
  });

  // Tất cả Product trừ những thằng đã được pick
  const transformedAllProducts = allProducts?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));

  console.log('allProducts', allProducts);

  // Delete Mutations
  const deleteMutation = useMutation({
    mutationFn: (id: any) => {
      return axios.delete(`http://localhost:1337/api/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  // Create Mutations
  const createMutation = useMutation({
    mutationFn: (data: any) => {
      return axios.post(`http://localhost:1337/api/products`, { data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Số lượng',
      dataIndex: 'product_details',
      key: 'product_details',
      render: (products: any) => <div>{products?.data?.length}</div>,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'images',
      key: 'images',
      render: (images: any) => {
        return images.data ? (
          <div className='flex'>
            <img
              src={`http://localhost:1337${images.data?.[images.data.length - 1].attributes.url}`}
              alt='hinh anh'
              className='h-14 w-14'
            />
            {images?.data?.length > 1 && <span>[{images.data.length}]</span>}
          </div>
        ) : (
          <img
            src={'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'}
            alt='hinh anh'
            className='h-14 w-14'
          />
        );
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: any) => <span>{dayjs(date).format('DD/MM/YYYY')}</span>,
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: any) => <span>{dayjs(date).format('DD/MM/YYYY')}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => {
        return (
          <Space size='middle'>
            <Tooltip title='Xem chi tiết Product'>
              <button
                className='text-blue-500'
                onClick={() => {
                  setIsEdit(true);
                  setValue('name', record.name);
                  setValue('images', record.images);
                  setValue('product_details', record?.product_details);
                  setIsModalOpen(true);
                }}
              >
                Xem chi tiết
              </button>
            </Tooltip>

            <Tooltip title='Xóa Product'>
              <button className='text-red-500' onClick={() => deleteMutation.mutate(record.id)}>
                Delete
              </button>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  if (isLoading) return <div>Loading...</div>;

  const dataSource = data?.data.map((item: any) => {
    const { id, attributes } = item;
    return { id, ...attributes };
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = (data: any) => {
    if (isEdit) {
      console.log('editttttttttttttt');
    } else {
      console.log('Createeeeeeeeeeeeeeeeeeeeeeeeee');
      createMutation.mutate(data);
    }

    //Nếu thành công thì set mở modal tạo details theo số lượng
    setCreateDetails(true);
    reset();
    setIsModalOpen(false);
  };

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <p className='text-[32px] font-medium uppercase'>Cơ sở vật chất</p>

        <Button type='primary' onClick={showModal}>
          Tạo mới
        </Button>

        <Modal
          title={isEdit ? 'Chỉnh sửa sản phẩm' : 'Tạo mới sản phẩm'}
          open={isModalOpen}
          onOk={handleSubmit(onSubmit)}
          onCancel={handleCancel}
        >
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
            <Controller
              control={control}
              name='name'
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                  <div>
                    <Input
                      placeholder='Tên sản phẩm'
                      value={value}
                      onChange={onChange}
                      status={error ? 'error' : undefined}
                    />
                  </div>
                );
              }}
            />

            <Controller
              control={control}
              name='product_details'
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                  <Input
                    disabled
                    type='number'
                    placeholder='Số lượng'
                    value={value?.data?.length}
                    onChange={onChange}
                    status={error ? 'error' : undefined}
                  />
                );
              }}
            />

            <div className=''>
              <p className='pb-2 font-semibold'>Chọn sản phẩm con</p>
              <Controller
                control={control}
                name='product_details'
                render={({ field: { onChange, value } }) => {
                  console.log(value);
                  const removeAtributes = value?.data?.map((item: any) => {
                    const { id, attributes } = item;
                    return { id, ...attributes };
                  });

                  //data child trong parent
                  const transformedValue = removeAtributes?.map((item: any) => ({
                    value: item.id,
                    label: item.name,
                  }));

                  return (
                    <Select
                      onChange={e => {
                        console.log('onmChange giò đó', e);
                      }}
                      className='w-full'
                      mode='multiple'
                      defaultValue='lucy'
                      value={transformedValue}
                      options={transformedAllProducts}
                    />
                  );
                }}
              />
            </div>

            <Controller
              control={control}
              name='images'
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                  <div className='flex flex-col gap-2'>
                    <div className='flex w-[478px] flex-wrap gap-4'>
                      {value?.data ? (
                        value?.data?.map((item: any) => (
                          <img
                            key={item.id}
                            src={`http://localhost:1337${item?.attributes.url}`}
                            alt='ádas'
                            width={144}
                            height={80}
                            onChange={onChange}
                          />
                        ))
                      ) : (
                        <img
                          src={
                            'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'
                          }
                          alt='hinh anh'
                          width={150}
                          height={80}
                        />
                      )}
                    </div>

                    <Upload className='flex-1'>
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </div>
                );
              }}
            />

            <div className={createDetails ? 'block' : 'hidden'}>
              <Divider>Tạo mới chi tiết sản phẩm</Divider>
            </div>
          </form>
        </Modal>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Product;
