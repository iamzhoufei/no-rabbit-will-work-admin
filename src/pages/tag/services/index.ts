import { request } from 'umi';
import type { ETagStatus } from '../interfaces';

export const createTag = async ({
  label,
  color,
  status,
}: {
  label: string;
  color: string;
  status: ETagStatus;
}) => {
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
  status,
}: {
  pageNo?: number;
  pageSize?: number;
  status?: ETagStatus;
}) => {
  return request<API.Response>('/api/tag', {
    method: 'GET',
    params: {
      pageNo,
      pageSize,
      status,
    },
  });
};
