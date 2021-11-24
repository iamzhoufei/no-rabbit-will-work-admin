export interface ITagModalProps {
  tag: ITag | undefined;
  onOk: (values: any) => void;
  onCancel: () => void;
}

export interface ITag {
  id: number;
  label: string;
  value: number;
  color: string;
  status: ETagStatus;
  bindArticles: number;
}

export enum ETagStatus {
  '全部' = 0,
  '启用中',
  '禁用中',
}
