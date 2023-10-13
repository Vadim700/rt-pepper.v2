import React from 'react';
import ContentLoader from 'react-content-loader';

export const MyLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={240}
    height={367}
    viewBox="0 0 240 367"
    backgroundColor="#cedaf3"
    foregroundColor="#eefbef"
    {...props}
  >
    <rect x="10" y="289" rx="0" ry="0" width="160" height="13" />
    <rect x="10" y="263" rx="0" ry="0" width="213" height="13" />
    <rect x="10" y="315" rx="0" ry="0" width="217" height="13" />
    <rect x="0" y="0" rx="8" ry="8" width="240" height="240" />
  </ContentLoader>
);
