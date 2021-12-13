import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
// to check if added or not in server git --> really upadted again?


function MyApp({ Component, pageProps: { session, ...pageProps } }
  ) 
{

  return(
    < SessionProvider session={session}>
      <RecoilRoot>
          <Component {...pageProps} />
    </RecoilRoot>
   </SessionProvider>
  )
}

export default MyApp
