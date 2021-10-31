import React from 'react';

import styles from '@/pages/home/components/overview/styles/index.less';
import type { ReactNode } from '.pnpm/@types+react@16.14.20/node_modules/@types/react';

const Overview = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className={styles.overviewWrapper}>
    <div className={styles.title}>{title}</div>
    <div className={styles.content}>
      <>{children}</>
    </div>
  </div>
);

export default Overview;
