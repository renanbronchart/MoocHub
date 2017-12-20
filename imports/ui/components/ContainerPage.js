import React from 'react';

// import layout from antd library component
import { Layout } from 'antd';
import { Navigation } from './Navigation';

// navigation Component
// import { Navigation } from '../../ui/components/Navigation';

const { Header, Footer, Sider, Content } = Layout;

export const ContainerPage = ({children, titlePage, isAdmin}) =>
  <Layout>
    <Sider className='navigation'><Navigation isAdmin={isAdmin}/></Sider>
    <Header className='header'>{titlePage}</Header>
    <Layout className='layout__page'>
      <Content className='container--fluid'>
        {children}
      </Content>
    </Layout>
  </Layout>
