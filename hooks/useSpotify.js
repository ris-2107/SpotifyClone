import React from 'react'
import { signIn, useSession } from 'next-auth/react';
import SpotifyWebApi from 'spotify-web-api-node';
import { useEffect } from 'react';

// to check if added or not in server git



import { useState } from 'react';

 const spotifyApi= new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})


function useSpotify() {
    const { data:session } = useSession();
    
        
            useEffect(() => {
                if(session)
                {
                    //If refresh token attempt fails, redirect to login!!
                    if(session.error === 'RefeshAccessTokenError'){
                        signIn();
                    }
                    spotifyApi.setAccessToken(session.user.accessToken)
                }

                
            }, [session]);
            
            return spotifyApi;
    
}

export default useSpotify
