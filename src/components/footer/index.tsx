import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 没有兔子会上班 · 大熊技术中心`}
    links={[
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/iamzhoufei',
        blankTarget: true,
      },
      // {
      //   key: 'artisan',
      //   title: '大熊技术中心',
      //   href: '',
      // },
    ]}
  />
);
