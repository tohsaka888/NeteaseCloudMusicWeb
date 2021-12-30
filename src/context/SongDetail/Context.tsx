import { createContext } from "react";

type SongProps = {
  song: any;
};

const SongContext = createContext<SongProps>({ song: null });

export { SongContext };
