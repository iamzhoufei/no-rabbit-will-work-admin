export type TLoginType = 'mobile' | 'nickname';

export interface ILoginParams {
  type: TLoginType;
  mobile?: string;
  nickname?: string;
  password: string;
}
