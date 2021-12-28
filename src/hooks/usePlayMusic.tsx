import { useCallback, useContext } from "react";
import { MusicPlayContext } from "../context/Context";
import { getMusicUrl } from "../request/Music";
// import useHttpRequest from "./useHttpRequest";

type PlayMusicFunc = (id: number) => void;

export default function usePlayMusic(): PlayMusicFunc {
  const props = useContext(MusicPlayContext);
  const playMusic = useCallback((id: number) => {
    const sendRequest = async () => {
      const data = await getMusicUrl(id);
      if (data.code === 200) {
        props?.setMusicUrl(data.data[0].url);
      }
    };
    sendRequest();
  }, [props]);
  return playMusic;
}
