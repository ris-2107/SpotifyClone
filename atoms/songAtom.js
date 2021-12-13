import { atom } from "recoil";
import { playlistState } from "./playlistAtom";
import Song from "../components/Song";



export const currentTrackIdState = atom({
    key: "currentTrackIdState",
    default: null,  
})

export const isPlayingState = atom({
    key :"isPlayingState",
    default :false,
});