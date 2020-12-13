import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

//const session = useSession();

const cardAttributes = {
    hoverable: true,
    style: {
        margin: '0 10%'
    }
};

const formAttributes = {
    name: "normal_login",
    className: "login-form",
    onFinish: (values) => {
        // FIXME - Use credentials
        signIn();
    }
};

const usernameAttributes = {
    formItem: {
        name: "username",
        rules: [
            {
                required: true,
                message: 'Please input your Username!',
            }
        ]
    },
    input: {
        prefix: <UserOutlined className="site-form-item-icon" />,
        placeholder: "Username"
    }
};

const passwordAttributes = {
    formitem: {
        name: "password",
        rules: [
            {
                required: true,
                message: 'Please input your Password!',
            }
        ]
    },
    input: {
        prefix: <LockOutlined className="site-form-item-icon" />,
        type: "password",
        placeholder: "Password"
    }
};

const loginButtonAttributes = {
    type: 'primary',
    htmlType: 'submit',
    className: 'login-form-button'
};

export default class LogIn extends React.Component {
    render = () => 
    <Card {...cardAttributes} >
        <Form {...formAttributes} >
        <Form.Item {...usernameAttributes.formItem} >
            <Input {...usernameAttributes.input} />
        </Form.Item>
        <Form.Item  {...passwordAttributes.formitem}>
            <Input.Password {...passwordAttributes.input} />
        </Form.Item>
        <Form.Item>
            <Button {...loginButtonAttributes}>
            Log in
            </Button>
        </Form.Item>
        </Form>
    </Card>
};
