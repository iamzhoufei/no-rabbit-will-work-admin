import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import { useMount } from 'ahooks';
import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

const ArticleUpdateComponent = () => {
  useMount(() => {
    document.addEventListener('onunload', () => {
      console.log('onunload');
    });
    // window.onunload = function () {
    //   sendVideoPlayEvent();
    //   isPlay = false;
    //   console.log('onunload');
    // };
  });

  return (
    <PageContainer title="" header={{ title: '' }}>
      <div>UpdateArticleComponent</div>
      <Card>
        <ReactMarkdown
          children={`Just a link: https://reactjs.com.`}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        />
      </Card>
    </PageContainer>
  );
};

export default ArticleUpdateComponent;
