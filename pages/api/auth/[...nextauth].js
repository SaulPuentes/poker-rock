import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { LogInUser, createUser } from '../user';

// TODO - JSDoc comment this
const authorizeCredentials = async (credentials) => {
    const user = LogInUser(credentials.username, credentials.password); // TODO - Call read user function form userController
    if(user) {
        return Promise.resolve(user);
    }
    else {
        const newUser = createUser(credentials.username, credentials.password); // TODO - Call create user function form userController
        if(newUser) {
            console.log('newUser:' + newUser);
            return Promise.resolve(newUser);
        }
    }
    console.log('AAAAAAAAAAAA');
    return Promise.resolve(null);
};

// TODO - JSDoc comment this
const providerCredentialOptions = {
    name: 'Username',
    credentials: {
        username: {
            label: "Username",
            type: "text",
            placeholder: "Username"
        },
        password: {
            label: "Password",
            type: "Password",
            placeholder: "Password"
        }
    },
    authorize: authorizeCredentials
};

// TODO - JSDoc comment this
const nextAuthOptions = {
    providers: [
        Providers.Credentials(providerCredentialOptions)
    ]
};

// TODO - JSDoc comment this
export default (req, res) => NextAuth(req, res, nextAuthOptions);
