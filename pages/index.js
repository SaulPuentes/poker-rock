import React from 'react';
import LogIn from '../components/LogIn';
import { Layout } from 'antd';
  
const { Header, Footer, Sider, Content } = Layout;

const contentAttributes = {
  style: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}

export default function index() {
  return (
    <Content {...contentAttributes} >
      <LogIn />
    </Content>
  );
}
