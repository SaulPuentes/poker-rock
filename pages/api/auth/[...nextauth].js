import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import collection from '@database/collections/users';
import User from '@models/User';

// TODO - JSDoc comment this
const credentials = {
    name: 'Credentials',
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
    authorize: async (credentials) => {
        const user = new User();
        user.username = credentials.username;
        user.password = credentials.password;
        const valid = await collection.validateCredentials(user);
        if(valid === null) {
            const created = await collection.create(user);
            if(created) {
                return Promise.resolve({name: user.username});
            }
        } else if (valid) {
            return Promise.resolve({name: user.username});
        }
        return null;
    }
};

// TODO - JSDoc comment this
const nextAuthOptions = {
    providers: [
        Providers.Credentials(credentials)
    ]
};

// TODO - JSDoc comment this
export default (req, res) => NextAuth(req, res, nextAuthOptions);
