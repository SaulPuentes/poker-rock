import React from 'react';
import LogIn from '../components/LogIn';
import Session from '../components/Session';
import { Layout } from 'antd';
  
const { Header, Footer, Sider, Content } = Layout;

const contentAttributes = {
  style: {
  }
}

const siderAttributes = {
  style: {
    flexGrow: '1', // FIXME - flexGrow and maxWidth are not working
    maxWidth: 'none'
  }
}

const footerAttributes = {
  style: {
  }
}

export default function index() {
  return (
    <Layout>
      <Header>
        Header
      </Header>
      <Layout>
        <Content {...contentAttributes}>
          <Session />
        </Content>
        <Sider {...siderAttributes}>
          <LogIn />
        </Sider>
      </Layout>
      <Footer {...footerAttributes}>
        Footer
      </Footer>
    </Layout>
  );
}