import React, { useContext } from "react";
import LoginImage from "../components/Friend/LoginImage";
import TrendsList from "../components/Friend/TrendsList";
import { LoginContext } from "../context/Context";

export default function Friend() {
  const { loginStatus } = useContext(LoginContext);
  return <>{loginStatus.profile ? <TrendsList /> : <LoginImage />}</>;
}
