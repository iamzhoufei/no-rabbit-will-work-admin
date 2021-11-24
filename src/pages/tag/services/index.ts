import { request } from 'umi';
import type { ETagStatus, ITag } from '../interfaces';

export const createTag = async ({ label, color, status }: ITag) => {
  return request<API.Response>('/api/tag', {
    method: 'POST',
    data: {
      label,
      color,
      status,
    },
  });
};

export const getAllTag = async ({
  pageNo = 1,
  pageSize = 10,
  label,
  status,
}: {
  pageNo?: number;
  pageSize?: number;
  label: string;
  status?: ETagStatus;
}) => {
  return request<API.Response>('/api/tag', {
    method: 'GET',
    params: {
      pageNo,
      pageSize,
      label,
      status,
    },
  });
};

export const updateTag = async ({ id, label, color, status }: ITag) => {
  return request<API.Response>('/api/tag', {
    method: 'PUT',
    data: {
      id,
      label,
      color,
      status,
    },
  });
};

export const removeTag = async (id: number) => {
  return request<API.Response>('/api/tag', {
    method: 'DELETE',
    data: {
      id,
    },
  });
};
