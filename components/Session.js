import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client';
import { Form, Button, List, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

//const session = useSession();

const logOutButtonAttributes = {
    type: 'primary',
    onClick: () => {
        //TODO - LogOut
        console.log('logout is pending');
    }
}

const listAttribute = {
    style: {
        margin: '0 5%',
        height: '100%',
        position: 'relative'
    },
    size: 'small',
    header: 'Session info',
    footer: <Button {...logOutButtonAttributes}>Log out</Button>,
    bordered: true,
    dataSource: [
        'Session started: false',
        'Username: unkown'
    ],
    renderItem: item => <List.Item>{item}</List.Item>
}


export default class Session extends React.Component {
    render = () => <List {...listAttribute} />
};
