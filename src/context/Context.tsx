import { createContext } from "react";

type VisibleProps = {
  visible: boolean;
  setVisible: Function;
};

type MusicPlayProps = {
  record: any;
  musicUrl: string;
  setRecord: Function;
  setMusicUrl: Function;
};

const VisibleContext = createContext<VisibleProps | null>(null);

const MusicPlayContext = createContext<MusicPlayProps | null>(null);

export { VisibleContext, MusicPlayContext };
