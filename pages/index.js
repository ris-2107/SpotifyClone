import Head from 'next/head'
import Center from '../components/Center'
import Sidebar from '../components/Sidebar'

// to check if added or not in server git --> in real??

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Create Next App</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
       
      <main className='flex '>
            <Sidebar />

            <Center />

      </main>

    <div> {/*Player*/} </div>


    </div>
  )
}
