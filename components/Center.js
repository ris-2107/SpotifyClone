import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from '@heroicons/react/outline'
import Sidebar from './Sidebar'
import { useEffect } from "react";
import {shuffle} from "lodash";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

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
     
 console.log(" Here's the playlist >>> ", playlist)

    return (
        <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide '>
           <header className='absolute top-5 right-8'>
               <div className= "text-white flex items-center bg-black space-x-3 opacity-88 hover:opacity-75 cursor-pointer rounded-full p-1 pr-2" onClick={() => signOut()} >
                   <img
                    className='rounded-full w-8 h-8'
                     src ={session?.user.image}
                  />
               

               <h2 className>{session?.user.name}</h2>
               <ChevronDownIcon className='h-4 w-5' />
               </div>

           </header>

           <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color}
                h-80 text-white p-3 `}>
                <img className="h-43 w-40 shadow-2xl rounded ml-3.5 mb-3 pb-2" src={playlist?.images?.[0]?.url}
                alt="" />
                <div>
                    <p>PlayList:-</p>
                    <h2 className="text-2xl md:text-3xl xl:text-5xl font-bold mb-5 pb-2">{playlist?.name}</h2>
                </div>
            </section>

                <div>
                    <Songs />
                </div>
            
        </div>
    );
}

export default Center
