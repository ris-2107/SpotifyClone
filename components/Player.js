import useSpotify from "../hooks/useSpotify"
import { useSession } from "next-auth/react"
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import { useState } from "react";
import { useEffect } from "react";
import {  DownloadIcon, FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, SwitchHorizontalIcon, UploadIcon, } from "@heroicons/react/outline";
import {RewindIcon } from "@heroicons/react/solid"
import { useCallback } from "react";
import { debounce } from "lodash";

function Player() {
    const spotifyApi = useSpotify();
    const {data:session, status} = useSession();
    const [currentTrackId, setCurrentIdTtrack] = useRecoilState(currentTrackIdState);
    

    const [isPlaying, setIsPlaying]  = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState(50);
    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if(!songInfo){
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                console.log("Now PLaying :>>", data.body?.item);
                setCurrentIdTtrack(data.body?.item?.id);
            

                    spotifyApi.getMyCurrentPlaybackState().then((data) => {
                        setIsPlaying(data.body?.is_playing);


                    })
                });

        }
    };

    const handlePlayPause = () =>{
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if(data.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false)
            } else{
                spotifyApi.play()
                setIsPlaying(true)
            }

        });
    };

    useEffect(() =>{
        if(spotifyApi.getAccessToken() && !currentTrackId){
            fetchCurrentSong();
            setVolume(50)
        }
        
    }, [currentTrackIdState, spotifyApi, session]);

    useEffect(() => {
        if(volume >0 && volume <100){
            debouncedAdjustVolume(volume);
        }

    }, [volume])

    const  debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume);
        }, 500),
         []
    )

    

    return (
        // left
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
        <div className="flex items-center space-x-4">
           <img className="hidden md:inline h-10 w-10"
            src={songInfo?.album?.images?.[0]?.url}
              />

            <div>
                <h3 className="text-white"> {songInfo?.name}</h3>
                <p>{songInfo?.artists?.[0]?.name}</p>
            </div>
        </div>

        {/* //center */}

        <div className=" flex items-center justify-evenly "> 
            <SwitchHorizontalIcon className="button" />
            <RewindIcon className="button" />

            {isPlaying ? (
                <PauseIcon onClick={handlePlayPause} className="button h-12 w-12" />
            ) : (
                <PlayIcon onClick={handlePlayPause} className="button h-11 w-11" />
            )}


            <FastForwardIcon className="button" />
            <ReplyIcon className="button" />
        </div>
     {/* //Right */}

     <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
         <DownloadIcon onClick={() => volume >0 && setVolume(volume-10)} className="button" />
         <input type="range" value={volume}
          onChange={e =>setVolume(Number(e.target.value ))}
          min={0}
          max={100} 
          />

         <UploadIcon onClick={() => volume<100  && setVolume(volume+10)} className="button" />
     </div>
    </div>
    );
}

export default Player
