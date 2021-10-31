/* eslint-disable @typescript-eslint/no-namespace */
export namespace Article {
  export interface Item {
    // 文章id
    id: string;
    // 文章标题
    title: string;
    // 文章介绍
    introduction?: string;
    // 文章内容
    content?: string;
    // 文章字数
    word_count: number;
    // 文章状态
    status: ArticleStatus;
    // 文章标签
    labels: ArticleLabel[];
    // 文章创建时间
    create_at: string;
    // 文章更新时间
    update_at?: string;
    // 文章是否被删除
    is_deleted: ArticleIsDeleted;
  }

  export enum ArticleStatus {
    '正在创作',
    '已发布',
  }

  export enum ArticleIsDeleted {
    '未删除',
    '已删除',
  }

  export interface ArticleLabel {
    color: string;
    label: string;
    value: number;
  }
}
