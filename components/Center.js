import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from '@heroicons/react/outline'
import Sidebar from './Sidebar'
import { useEffect } from "react";
import {shuffle} from "lodash";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistIdState, playlistState } from "../.next/atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

const colors=[
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-purple-500",
    "from-indigo-500",
    "from-pink-500" 
];



function Center() {

    const { data:session} = useSession();
    const[color, setColor] = useState(null);
    const spotifyApi = useSpotify();
    const playlistId = useRecoilValue(playlistIdState );
    const [playlist, setPlaylist] = useRecoilState(playlistState);

     useEffect(() =>{
        setColor (shuffle(colors).pop()) , [playlistId]
    });

 useEffect(() => {
     spotifyApi
     .getPlaylist(playlistId)
     .then((data) => {
      setPlaylist(data.body);
     }).catch((err) => console.log("Something went wrong", err));

 }, [spotifyApi, playlistId])
     
 console.log("Here's the playlist >>> ", playlist)

    return (
        <div className='flex-grow'>
           <header className='absolute top-5 right-8'>
               <div className= "flex items-center bg-red-400 space-x-3 opacity-88 hover:opacity-75 cursor-pointer rounded-full p-1 pr-2" >
                   <img className='ml-1 rounded-full w-8 h-8.3' src ={session?.user.image} />
               

               <h2 className="text-white">{session?.user.name}</h2>
               <ChevronDownIcon className='h-4 w-5 p-0.34' />
               </div>

           </header>

           <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color}
            h-80 text-white padding-8 `}>
                
            </section>
        </div>
    )
}

export default Center
