import { createContext, MutableRefObject } from "react";

type VisibleProps = {
  visible: boolean;
  setVisible: Function;
};

type MusicPlayProps = {
  record: any;
  musicUrl: string;
  setRecord: Function;
  setMusicUrl: Function;
  controllerRef: MutableRefObject<HTMLAudioElement | undefined>;
};

type CurrentTimeProps = {
  currentTime: number;
  setCurrentTime: Function;
};

type LoginProps = {
  isLogin: boolean;
  setIsLogin: Function;
  loginStatus: any;
  setLoginStatus: Function;
};

const VisibleContext = createContext<VisibleProps | null>(null);

const MusicPlayContext = createContext<MusicPlayProps | null>(null);

const LoginContext = createContext<LoginProps>({
  isLogin: false,
  setIsLogin: () => {},
  loginStatus: null,
  setLoginStatus: () => {},
});

const CurrentTimeContext = createContext<CurrentTimeProps>({
  currentTime: 0,
  setCurrentTime: () => {},
});

export { VisibleContext, MusicPlayContext, LoginContext, CurrentTimeContext };
