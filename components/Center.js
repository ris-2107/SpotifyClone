import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from '@heroicons/react/outline'
import Sidebar from './Sidebar'





function Center() {
    const { data:session} = useSession();
    return (
        <div className='flex-grow'>
           <header className='absolute top-5 right-8  '>
               <div className='flex items-center bg-black space-x-3 opacity-90
                     hover:opacity-78 cursor-pointer rounded-full 
                    p-1 pr-2'>
                   <img className='rounded-full w-10 h-10' src ={session?.user.image} />
               

               <h2 className="text-white">{session?.user.name}</h2>
               <ChevronDownIcon className='h-5 w-5' />
               </div>

           </header>

           <section className={`flex items-end space-x-7 bg-gradient-to-b to-black from-red-500
            h-80 text-white padding-8 `}>
                
            </section>
        </div>
    )
}

export default Center
