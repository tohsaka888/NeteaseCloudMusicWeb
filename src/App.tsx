import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import MusicController from "./components/MusicController/MusicController";
import {
  CurrentTimeContext,
  LoginContext,
  MusicPlayContext,
  VisibleContext,
} from "./context/Context";
import Album from "./pages/Album";
import Artist from "./pages/Artist";
import DjRadio from "./pages/DjRadio";
import Download from "./pages/Download";
import Friend from "./pages/Friend";
import HomePage from "./pages/HomePage";
import Musician from "./pages/Musician";
import MyMusic from "./pages/MyMusic";
import Playlist from "./pages/Playlist";
import PlaylistDetail from "./pages/PlaylistDetail";
import Shop from "./pages/Shop";
import Toplist from "./pages/Toplist";
import SongDetail from "./pages/SongDetail";
import { BackTop } from "antd";
import useIsMobile from "./hooks/useIsMobile";

const PlaylistContainer = styled.div`
  padding: 0px 18vw;
`;

function App() {
  const [visible, setVisible] = useState<boolean>(false);
  const [record, setRecord] = useState<any>({});
  const [musicUrl, setMusicUrl] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [loginStatus, setLoginStatus] = useState<any>({ profile: null });
  const [currentTime, setCurrentTime] = useState<number>(0);
  const controllerRef = useRef<HTMLAudioElement>();
  const isMobile = useIsMobile();
  useEffect(() => {
    if (isMobile) {
      window.open("https://www.baidu.com/", "_self");
    }
  }, [isMobile]);
  return (
    <>
      {!isMobile && (
        <VisibleContext.Provider
          value={{ visible: visible, setVisible: setVisible }}
        >
          <MusicPlayContext.Provider
            value={{
              record: record,
              setRecord: setRecord,
              musicUrl: musicUrl,
              setMusicUrl: setMusicUrl,
              controllerRef: controllerRef,
            }}
          >
            <LoginContext.Provider
              value={{
                isLogin: isLogin,
                setIsLogin: setIsLogin,
                loginStatus: loginStatus,
                setLoginStatus: setLoginStatus,
              }}
            >
              <CurrentTimeContext.Provider
                value={{
                  currentTime: currentTime,
                  setCurrentTime: setCurrentTime,
                }}
              >
                <Header />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="discover" element={<HomePage />} />
                  <Route path="my" element={<MyMusic />}>
                    <Route path=":id" element={<PlaylistDetail />} />
                  </Route>
                  <Route path="friend" element={<Friend />} />
                  <Route path="shop" element={<Shop />} />
                  <Route path="musician" element={<Musician />} />
                  <Route path="download" element={<Download />} />
                  <Route path="discover/toplist" element={<Toplist />} />
                  <Route path="discover/playlist" element={<Playlist />}>
                    <Route path=":playlistParams" element={<Playlist />} />
                  </Route>
                  <Route path="discover/djradio" element={<DjRadio />} />
                  <Route path="discover/artist" element={<Artist />} />
                  <Route path="discover/album" element={<Album />} />
                  <Route
                    path="playlist/:id"
                    element={
                      <PlaylistContainer>
                        <PlaylistDetail />
                      </PlaylistContainer>
                    }
                  />
                  <Route path="song/:id" element={<SongDetail />} />
                </Routes>
                <MusicController />
                <BackTop />
              </CurrentTimeContext.Provider>
            </LoginContext.Provider>
          </MusicPlayContext.Provider>
        </VisibleContext.Provider>
      )}
    </>
  );
}

export default App;
