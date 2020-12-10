import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { LogInUser, createUser } from '../user' 

//Brings the data from the form, using the Provider by Credentials
const options = {
    providers: [
        Providers.Credentials({
            name: 'User Name',
            credentials: {
                username: { label: "User", type: "text", placeholder: "user name" },
                password: {  label: "Password", type: "password" }
            },
            //Calls the LogInUser function from user in order to verify the existing user
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