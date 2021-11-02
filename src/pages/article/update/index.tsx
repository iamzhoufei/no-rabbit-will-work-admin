import React from 'react';

import { useMount } from 'ahooks';
import { Card } from 'antd';

const ArticleUpdateComponent = () => {
  useMount(() => {
    new (window as any).Cherry({
      id: 'markdown-container',
      value: '# 请输入文章标题',
      editor: {
        height: '84vh',
      },
    });
    // window.onunload = function () {
    //   sendVideoPlayEvent();
    //   isPlay = false;
    //   console.log('onunload');
    // };

    window.onbeforeunload = () => '二次确认';
  });

  return (
    <Card>
      <div id="markdown-container" />
    </Card>
  );
};

export default ArticleUpdateComponent;
