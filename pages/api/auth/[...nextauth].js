import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { LogInUser, createUser } from '../user' 

const options = {
    providers: [
        Providers.Credentials({
            name: 'User Name',
            credentials: {
                username: { label: "User", type: "text", placeholder: "user name" },
                password: {  label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                const user = await LogInUser(credentials.username, credentials.password)
                console.log(user)
                return Promise.resolve(user)
            }
    })
    ],
    session: {
        jwt: true
    },
    jwt: {
        secret: 'supercalifragilisticoespiralidoso'
    },
    debug: true,

    // Optional SQL or MongoDB database to persist users
    database: process.env.DATABASE_URL
}//End of options

export default (req, res) => NextAuth(req, res, options)