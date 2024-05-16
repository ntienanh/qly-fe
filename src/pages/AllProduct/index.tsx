import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Modal, Space, Switch, Table, Tooltip } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const AllProduct = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  const { control, handleSubmit, reset, setValue, watch } = useForm<any>({
    defaultValues: { name: '', description: '', status: false },
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (des: any) => <span>{des || '-'}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (stt: any) => <Switch value={stt} />,
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
                  setValue('id', record.id);
                  setValue('name', record.name);
                  setValue('description', record.description);
                  setValue('status', record.status);
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
    setIsEdit(false);
  };

  const { isLoading, data } = useQuery({
    queryKey: ['product-details'],
    queryFn: () => axios.get('http://localhost:1337/api/product-details').then(res => res.data),
  });

  // Create Mutations
  const createMutation = useMutation({
    mutationFn: (data: any) => {
      return axios.post(`http://localhost:1337/api/product-details`, { data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-details'] });
    },
  });

  // Delete Mutations
  const deleteMutation = useMutation({
    mutationFn: (id: any) => {
      return axios.delete(`http://localhost:1337/api/product-details/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-details'] });
    },
  });

  // Update Mutations
  const updateMutation = useMutation({
    mutationFn: (body: any) => {
      const { id, ...data } = body;
      return axios.put(`http://localhost:1337/api/product-details/${id}`, { data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-details'] });
    },
  });

  const onSubmit = (data: any) => {
    delete data.createdAt;
    delete data.updatedAt;
    delete data.createdBy;
    delete data.updatedBy;
    delete data.publishedAt;

    if (data?.id) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
    reset();
    setIsModalOpen(false);
  };

  const dataSource = data?.data.map((item: any) => {
    const { id, attributes } = item;
    return { id, ...attributes };
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <p className='text-[32px] font-medium uppercase'>Tất cả vật tư</p>
        <Button type='primary' onClick={showModal}>
          Tạo mới
        </Button>
      </div>

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
            name='description'
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <div>
                  <Input
                    placeholder='Description'
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
            name='status'
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <div>
                  <Switch value={value} onChange={onChange} />
                </div>
              );
            }}
          />
        </form>
      </Modal>

      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default AllProduct;
