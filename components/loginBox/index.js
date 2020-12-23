import React from 'react'
import { signIn, signOut, useSession, csrfToken } from 'next-auth/client';
import 'antd/dist/antd.css';
import { useRouter } from 'next/router';
import { Form, Input, Button, Card, Result } from 'antd';

export default function LoginBox() {

    const [ session, loading ] = useSession();
    const router = useRouter();

    if(!loading && session != null) {
        router.push('home');
    }

    const resultAttributes = {
        status: (loading)? 'info' :
            (session == null)? 'error' : 'success',
        title: (loading)? 'Loading..' :
            (session == null)? 'Not signed in.' : `Welcome ${session.user.name}!`,
        subTitle: (loading)? 'This might take a couple seconds.' :
            (session == null)? 'Please sign in before continue.' : 'Successfully signed in.'
    }


    const signInOrRegister = async (credentials) => {
        const data = credentials
        signIn('credentials', data)
    }

    const rules = {
        username: [
            {
                required: true,
                message: 'Please input your username!'
            }
        ],
        password: [
            {
                required: true,
                message: 'Please input your password!',
            }
        ]
    }

    return (
        <Card hoverable={true}>
            <Result {...resultAttributes} />
            <Form onFinish={signInOrRegister} >
                <Form.Item  label="Username" name="username" rules={rules.username} >
                    <Input />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={rules.password} >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Sign In / Register
                    </Button>
                    <Button type="secondary" onClick={signOut} style={{margin: '0 5%'}}>
                        Sign Out
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};