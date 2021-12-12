import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
// to check if added or not in server git --> really upadted again?


function MyApp({ Component, pageProps: { session, ...pageProps } }
  ) 
{

  return(
    < SessionProvider session={session}>
          <Component {...pageProps} />
   </SessionProvider>
  )
}

export default MyApp
