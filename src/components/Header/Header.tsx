import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/Header.css";
import DevelopCenter from "./DevelopCenter";
import HeaderBottom from "./HeaderBottom";
import Login from "./Login";
import Logo from "./Logo";
import Search from "./Search";

export default function Header() {
  const { Header } = Layout;
  const navigator = useNavigate();
  const location = useLocation();
  const moveTo = (route: string) => {
    navigator(route);
  };
  return (
    <>
      <Header className="header_container">
        <Logo />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[location.pathname]}
          className="header_menu"
        >
          <Menu.Item
            key={"/"}
            onClick={() => {
              moveTo("/");
            }}
          >
            发现音乐
          </Menu.Item>
          <Menu.Item
            key={"/my"}
            onClick={() => {
              moveTo("my");
            }}
          >
            我的音乐
          </Menu.Item>
          <Menu.Item
            key={"/friend"}
            onClick={() => {
              moveTo("friend");
            }}
          >
            朋友
          </Menu.Item>
          <Menu.Item
            key={"/shop"}
            onClick={() => {
              moveTo("shop");
            }}
          >
            商城
          </Menu.Item>
          <Menu.Item
            key={"/musician"}
            onClick={() => {
              moveTo("musician");
            }}
          >
            音乐人
          </Menu.Item>
          <Menu.Item
            key={"/download"}
            onClick={() => {
              moveTo("download");
            }}
          >
            下载客户端
          </Menu.Item>
        </Menu>
        <Search />
        <DevelopCenter />
        <Login />
      </Header>
      <HeaderBottom />
    </>
  );
}
