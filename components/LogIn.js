import React from 'react'
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Result, Button, Card } from 'antd';
import 'antd/dist/antd.css';

const cardAttributes = {
    hoverable: true,
    style: {
        margin: '0 10%',
        width: '500px'
    }
};

const getResultAttributes = () => {
    const [ session, loading ] = useSession();
    if(loading) {
        return {
            status: 'info',
            title: 'Loading...',
            subTitle: 'This might take a couple seconds.'
        };
    } else if(session == null) {
        return {
            status: 'error',
            title: 'Not signed in.',
            subTitle: 'Please sign in before continue.'
        };
    } else {
        const router = useRouter();
        if (typeof window !== 'undefined') {
            router.push('/home');
        };
        return {
            status: 'success',
            title: `Welcome ${session.user.name}!`,
            subTitle: 'Successfully signed in.'
        };
    }
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
    const resultAttributes = getResultAttributes();
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

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
        props: {
            session
        }
    }
}