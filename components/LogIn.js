import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client';
import { Form, Result, Button, Card } from 'antd';
import 'antd/dist/antd.css';

const cardAttributes = {
    hoverable: true,
    style: {
        margin: '0 10%',
        width: '500px'
    }
};

const getResultAttributes = (username = null) => {
    const loggedIn = username != null;
    return {
        status: (loggedIn)? 'success' : 'warning',
        title: (loggedIn)? `Welcome!` : 'Not signed in.',
        subTitle:(loggedIn)? 'Successfully signed in.' : 'Please sign in before continue.'
    };
};

const singInButtonAttributes = {
    type: 'primary',
    className: 'login-form-button',
    onClick: signIn
};

const singOutButtonAttributes = {
    type: 'secondary',
    className: 'login-form-button',
    style: {
        margin: '0 5%'
    },
    onClick: signOut
};

export default function LogIn() {
    const session = useSession();
    console.log(session);
    const resultAttributes =  getResultAttributes(session.username);
    return ( 
        <Card {...cardAttributes} >
            <Result {...resultAttributes}/>
            <Button {...singInButtonAttributes}>
                Sign in
            </Button>
            <Button {...singOutButtonAttributes}>
                Sign out
            </Button>
        </Card>
    );
};
