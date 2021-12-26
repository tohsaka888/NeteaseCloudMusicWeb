import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import { VisibleContext } from "./context/Context";
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

function App() {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <VisibleContext.Provider value={{visible: visible, setVisible: setVisible}}>
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
        <Route path="discover/playlist" element={<Playlist />} />
        <Route path="discover/djradio" element={<DjRadio />} />
        <Route path="discover/artist" element={<Artist />} />
        <Route path="discover/album" element={<Album />} />
      </Routes>
    </VisibleContext.Provider>
  );
}

export default App;
