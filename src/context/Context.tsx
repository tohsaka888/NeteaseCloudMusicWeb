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

export { VisibleContext, MusicPlayContext, LoginContext };
