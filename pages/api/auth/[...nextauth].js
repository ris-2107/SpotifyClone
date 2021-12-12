import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify" 
import Login from "../../Login"

async function refreshAccessToken(token){
  
  try{

    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    
    const {body : refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log( "Refreshed Token is >>>>", refreshedToken)

    return { 
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires:Date.now + refreshedToken.expires_in * 1000,    // since, 1 hr = 3600s

      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // Here >> refresh if new came by from the API CAll else use the previous one


    }

  }

catch(error){
  console.log(error)

   return{
     ...token,
     error: 'RefeshAccessTokenError',
   }
};

}

export default NextAuth({

  // Configure one or more authentication providers

  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization:LOGIN_URL,
      
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages:{
    signIn:'/login',

  },
  callbacks:{

    async jwt({token, account, user}){
      // if it was initial signin

      if(account && user)
      {
        return{
          ...token,
          accessToken:account.access_token, 
          refreshToken:account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires:account.expires_at * 1000,  // the API bot uses miliseconds returning time 

        }
      }

      //REturn the previous token has not expired

      if(Date.now() < token.accessTokenExpires){
        console.log("Access token has is Valid.")
        return token;
      }

     // access token has expired then:

     console.log("Access token has expired, refreshing!!")
     return await refreshAccessToken(token)
    },

    async session ({session, token}) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username =  token.username;

      return session;
    }

  },


});