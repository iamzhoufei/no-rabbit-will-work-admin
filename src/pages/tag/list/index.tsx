/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';

import ProTable from '@ant-design/pro-table';
import { Button, message, Popconfirm } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';

import type { ActionType, ProColumns } from '@ant-design/pro-table';

import { CodeMessage } from '@/interface';
import type { ITag } from '@/pages/tag/interfaces';
import { ETagStatus } from '@/pages/tag/interfaces';
import { createTag, getAllTag, removeTag, updateTag } from '../services';

import TagModalComponent from '../components/tagModal';

import styles from './styles/index.less';

const TagListPage = (): React.ReactNode => {
  const actionRef = useRef<ActionType>();
  const [tag, setTag] = useState<ITag>();
  const [isTagModalShow, setIsTagModalShow] = useState<boolean>(false);

  const columns: ProColumns<ITag>[] = [
    {
      title: '标签ID',
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 50,
      align: 'center',
    },
    {
      title: '标签名称',
      dataIndex: 'label',
      width: 100,
      align: 'center',
      render: (_text, _record, _, _action) => {
        return (
          <div
            className={styles.labelWrapper}
            style={{ border: `1px solid ${_record?.color}`, color: _record?.color }}
          >
            {_text}
          </div>
        );
      },
    },
    {
      title: '关联文章数量',
      dataIndex: 'bindCount',
      search: false,
      width: 100,
      align: 'center',
    },

    {
      title: '标签状态',
      dataIndex: 'status',
      width: 100,
      align: 'center',
      valueType: 'select',
      valueEnum: {
        0: { text: '全部', status: 'Success' },
        1: { text: '启用中', status: 'Success' },
        2: { text: '禁用中', status: 'Error' },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      width: 150,
      render: (_text, _record, _, _action) => [
        _record.status === ETagStatus['启用中'] ? (
          <Button key="disabled_btn" onClick={() => handleToggleStatus(_record)}>
            禁用
          </Button>
        ) : (
          <Button key="enabled_btn" onClick={() => handleToggleStatus(_record)}>
            启用
          </Button>
        ),
        <Button key="edit_btn" onClick={() => handleEdit(_record)}>
          编辑
        </Button>,
        <Popconfirm
          title={`确定删除「${_record?.label}」标签吗？`}
          onConfirm={() => handleRemove(_record?.id)}
          onCancel={() => {}}
          okText="确定"
          cancelText="取消"
        >
          <Button danger key="remove_btn">
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  // 更新/保存标签状态
  async function handleModifyTag(values: any) {
    if (tag) {
      const result = await updateTag(values);
      if (result?.code === CodeMessage['服务器成功返回请求的数据。']) {
        message.success('更新标签成功');
        actionRef?.current?.reload();
        setIsTagModalShow(false);
      }
    } else {
      const result = await createTag(values);
      if (result?.code === CodeMessage['服务器成功返回请求的数据。']) {
        message.success('创建标签成功');
        actionRef?.current?.reload();
        setIsTagModalShow(false);
      }
    }
  }

  // 切换标签状态
  async function handleToggleStatus(_tag: ITag) {
    await updateTag({
      ..._tag,
      status: _tag.status === ETagStatus['启用中'] ? ETagStatus['禁用中'] : ETagStatus['启用中'],
    });
    message.success('更新标签状态成功');
    actionRef?.current?.reload();
  }

  // 更新标签弹窗
  async function handleEdit(_tag: ITag) {
    setIsTagModalShow(true);
    setTag(_tag);
  }

  // 删除标签
  async function handleRemove(id: number) {
    await removeTag(id);
    actionRef?.current?.reload();
    message.success('删除标签成功');
  }

  // 关闭标签弹窗
  async function handleCloseModal() {
    setIsTagModalShow(false);
    setTag(undefined);
  }

  return (
    <PageContainer>
      <ProTable<ITag>
        columns={columns}
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 'auto' }}
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
          const requestParams = {
            pageNo: params?.current,
            pageSize: params?.pageSize,
            label: params?.label ?? '',
            status: params?.status ?? ETagStatus['全部'],
          };

          const result = await getAllTag(requestParams);
          const { pagination } = result?.data;
          return {
            data: result?.data,
            success: true,
            total: pagination?.total,
          };
        }}
        postData={(data: any[]) => (data as any).list}
      />
      {isTagModalShow ? (
        <TagModalComponent tag={tag} onOk={handleModifyTag} onCancel={handleCloseModal} />
      ) : null}
    </PageContainer>
  );
};

export default TagListPage;
