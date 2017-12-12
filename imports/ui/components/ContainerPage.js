import React from 'react';

// import layout from antd library component
import { Layout } from 'antd';

// navigation Component
// import { Navigation } from '../../ui/components/Navigation';

const { Header, Footer, Sider, Content } = Layout;

export const ContainerPage = ({children, titlePage}) =>
  <Layout>
    <Header className='header'>{titlePage}</Header>
    <Layout className='layout__page'>
      <Content>
        {children}
      </Content>
    </Layout>
  </Layout>
