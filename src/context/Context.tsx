import { createContext } from "react";

type VisibleProps = {
  visible: boolean;
  setVisible: Function;
};

const VisibleContext = createContext<VisibleProps | null>(null);

export { VisibleContext };
