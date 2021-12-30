import { useCallback, useContext, useEffect, useState } from "react";
import { Lrc, Lyric } from "lrc-kit";
import { MusicPlayContext } from "../context/Context";

type Lyrics = {
  startTime: number;
  endTime: number;
  content: string;
  length: number;
  contentZH: string;
};

export default function useLrcParser(data: any): Lyrics[] | null {
  const [lyrics, setLyrics] = useState<any[] | null>(null);
  const musicProps = useContext(MusicPlayContext);
  const getLrc = useCallback(async () => {
    if (data) {
      const lyric: Lyrics[] = [];
      let parsedLyric: any[] = [];
      let parsedLyricZH: any[] = [];
      if (data.lrc && data.lrc.lyric) {
        parsedLyric = Lrc.parse(data.lrc.lyric).lyrics;
      }
      if (data.tlyric && data.tlyric.lyric) {
        parsedLyricZH = Lrc.parse(data.tlyric.lyric).lyrics;
      }
      if (parsedLyric.length !== 0) {
        parsedLyric.forEach((item: Lyric, index: number) => {
          let startTime = item.timestamp;
          let endTime = 0;
          if (index < parsedLyric.length - 1) {
            endTime = parsedLyric[index + 1].timestamp;
          } else {
            if (musicProps?.controllerRef.current) {
              endTime = musicProps.controllerRef.current.duration;
            }
          }
          if (parsedLyricZH.length) {
            for (let i = 0; i < parsedLyricZH.length; i++) {
              if (
                parsedLyricZH[i] &&
                parsedLyricZH[i].timestamp === item.timestamp &&
                item.content
                // parsedLyricZH[i].content
              ) {
                if (item.content) {
                  lyric.push({
                    startTime: startTime,
                    endTime: endTime,
                    content: item.content,
                    length: parsedLyric.length,
                    contentZH: parsedLyricZH[i].content,
                  });
                }
              }
            }
          } else {
            if (item.content) {
              lyric.push({
                startTime: startTime,
                endTime: endTime,
                content: item.content,
                length: parsedLyric.length,
                contentZH: "",
              });
            }
          }
        });
      } else {
        let endTime = 0;
        if (musicProps?.controllerRef.current) {
          endTime = musicProps.controllerRef.current.duration;
        }
        lyric.push({
          startTime: 0,
          endTime: endTime || 100000,
          content: "纯音乐,请欣赏~",
          length: 1,
          contentZH: "",
        });
      }
      setLyrics(lyric);
    }
  }, [data, musicProps?.controllerRef]);
  useEffect(() => {
    getLrc();
  }, [getLrc]);
  return lyrics;
}
