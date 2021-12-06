import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Download from "./pages/Download";
import Friend from "./pages/Friend";
import HomePage from "./pages/HomePage";
import Musician from "./pages/Musician";
import MyMusic from "./pages/MyMusic";
import Shop from "./pages/Shop";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="my" element={<MyMusic />} />
        <Route path="friend" element={<Friend />} />
        <Route path="shop" element={<Shop />} />
        <Route path="musician" element={<Musician />} />
        <Route path="download" element={<Download />} />
      </Routes>
    </>
  );
}

export default App;
