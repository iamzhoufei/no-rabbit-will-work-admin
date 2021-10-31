import React, { useRef } from 'react';
import { request, history } from 'umi';

import ProTable from '@ant-design/pro-table';
import { Button, Card, Space, Tag } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ProFormSelect } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

import type { ActionType, ProColumns } from '@ant-design/pro-table';

import type { Article } from '@/pages/article/models';

const ArticleListComponent = (): React.ReactNode => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Article.Item>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 50,
      align: 'center',
    },
    {
      title: '标题',
      dataIndex: 'title',
      copyable: true,
      ellipsis: true,
      width: 200,
      align: 'center',
    },
    {
      title: '简介',
      dataIndex: 'description',
      copyable: true,
      ellipsis: true,
      search: false,
      width: 150,
      align: 'center',
    },
    {
      title: '标签',
      dataIndex: 'labels',
      align: 'center',
      width: 200,
      renderFormItem: (_, { defaultRender }) => {
        // return defaultRender(_);
        return (
          <ProFormSelect
            name="labels"
            label=""
            fieldProps={{ mode: 'multiple' }}
            request={async () => [
              { label: '全部', value: 'all' },
              { label: '未解决', value: 'open' },
              { label: '已解决', value: 'closed' },
              { label: '解决中', value: 'processing' },
            ]}
            placeholder="Please select a country"
            rules={[{ required: true, message: 'Please select your country!' }]}
          />
        );
      },
      render: (_, record) => (
        <Space>
          {record.labels.map(
            ({ label, value, color }: { label: string; color: string }, index: number) => (
              <Tag color={color} key={`tag_${index}`}>
                {label}
              </Tag>
            ),
          )}
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 150,
      align: 'center',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
          disabled: true,
        },
        processing: {
          text: '解决中',
          status: 'Processing',
        },
      },
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
      align: 'center',
      width: 200,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      width: 150,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a href={''} target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <Card>
        <ProTable<any>
          bordered={true}
          columns={columns}
          actionRef={actionRef}
          request={async (params = {}, sort, filter) => {
            console.log(sort, filter);
            return request<{
              data: any[];
            }>('https://proapi.azurewebsites.net/github/issues', {
              params,
            });
          }}
          rowKey="id"
          search={{ labelWidth: 'auto' }}
          pagination={{ pageSize: 10 }}
          dateFormatter="string"
          toolBarRender={() => [
            <Button
              key="button"
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => history.push('/article/create')}
            >
              去写一篇新的
            </Button>,
          ]}
        />
      </Card>
    </PageContainer>
  );
};

export default ArticleListComponent;
