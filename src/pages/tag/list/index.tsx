/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';

import ProTable from '@ant-design/pro-table';
import { Button, Card, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';

import type { ActionType, ProColumns } from '@ant-design/pro-table';

import type { ITag } from '@/pages/tag/interfaces';
import TagModalComponent from '../components/tagModal';
import { createTag, getAllTag } from '../services';

const TagListPage = (): React.ReactNode => {
  const actionRef = useRef<ActionType>();
  const [tag, setTag] = useState<ITag>();
  const [isTagModalShow, setIsTagModalShow] = useState<boolean>(false);

  const columns: ProColumns<ITag>[] = [
    {
      title: '标签id',
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 50,
      align: 'center',
    },
    {
      title: '标签名称',
      dataIndex: 'label',
      copyable: true,
      ellipsis: true,
      width: 100,
      align: 'center',
    },
    {
      title: '关联文章',
      dataIndex: 'bindArticles',
      search: false,
      width: 150,
      align: 'center',
    },
    {
      title: '标签状态',
      dataIndex: 'status',
      width: 100,
      align: 'center',
      valueType: 'select',
      valueEnum: {
        0: { text: '禁用中', status: 'Error' },
        1: { text: '启用中', status: 'Success' },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      width: 150,
      render: (_text, _record, _, _action) => [
        <Button key="enabled_btn">启用</Button>,
        <Button key="disabled_btn">禁用</Button>,
      ],
    },
  ];

  const handleCreateTag = async (values: any) => {
    console.log(values);
    await createTag({
      label: values?.label,
      status: values?.status,
      color: 'red',
    });
    message.success('创建标签成功', () => setIsTagModalShow(false));
  };

  return (
    <PageContainer>
      <Card>
        <ProTable<ITag>
          bordered={true}
          columns={columns}
          actionRef={actionRef}
          rowKey="id"
          search={{ labelWidth: 'auto' }}
          pagination={{ pageSize: 10 }}
          dateFormatter="string"
          toolBarRender={() => [
            <Button
              key="button"
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => setIsTagModalShow(true)}
            >
              创建新的标签
            </Button>,
          ]}
          request={async (params) => {
            console.log(params);
            const result = await getAllTag({
              pageNo: params?.current,
              pageSize: params?.pageSize,
              status: +params?.status,
            });
            const { total } = result?.data;
            return {
              data: result?.data,
              success: true,
              total, // 不传会使用 data 的长度，如果是分页一定要传
            };
          }}
          postData={(data: any[]) => (data as any).list}
        />
      </Card>
      <TagModalComponent
        tag={tag as ITag}
        visible={isTagModalShow}
        onOk={handleCreateTag}
        onCancel={() => setIsTagModalShow(false)}
      />
    </PageContainer>
  );
};

export default TagListPage;
