import axios from 'axios'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    providers : [
        Providers.Credentials({
            name: "Custom Provider",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "example"},
                password: { label: "Password", type: "password"}
            },
            async authorize(credentials) {
                const url = `http://localhost:8000/login/${credentials.username}/${credentials.password}`;
                const response = await axios.get(url, credentials);
                if(response){
                    console.log(response.data);
                    return response.data;
                } else {
                    return null;
                }
            }
        })
    ],
    session: {
        jwt: true,
    }
}

export default (req, res) => NextAuth(req, res, options);