import React from 'react';
import LoginBox from '@components/loginBox/index';
import { Layout } from 'antd';

export default function index() {

  const { Header, Footer, Sider, Content } = Layout;

  const styles = {
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  }

  return (
    <Content style={styles.content} >
      <LoginBox />
    </Content>
  );
  
}
