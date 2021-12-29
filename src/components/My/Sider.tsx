import { Layout, Menu, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../context/Context";
// import useLoginStatus from "../../hooks/useLoginStatus";
import { getUserPlaylist } from "../../request/my/Sider";
import "../../styles/MyMusic.css";
import SiderItem from "./SiderItem";

export default function Sider() {
  // const loginStatus = useLoginStatus();
  const loginProps = useContext(LoginContext);
  const params = useParams();
  const [created, setCreated] = useState<any[]>([]);
  const [favour, setFavour] = useState<any[]>([]);
  const navigator = useNavigate();
  useEffect(() => {
    const sendRequest = async () => {
      if (loginProps?.loginStatus.code === 200) {
        const id = loginProps?.loginStatus.profile.userId || 0;
        if (id) {
          const data = await getUserPlaylist(id);
          if (data.code === 200) {
            let playlist = data.playlist;
            let userPlaylists: any[] = [];
            let favourPlaylists: any[] = [];
            if (playlist.length) {
              playlist.forEach((item: any) => {
                if (item.userId === id) {
                  userPlaylists.push(item);
                } else {
                  favourPlaylists.push(item);
                }
              });
              setCreated(userPlaylists);
              setFavour(favourPlaylists);
            }
            if (!params.id) {
              navigator(`./${data.playlist[0].id}`);
            }
          }
        }
      }
    };
    sendRequest();
  }, [
    loginProps?.loginStatus.code,
    loginProps?.loginStatus.profile.userId,
    navigator,
    params.id,
  ]);

  return (
    <Layout.Sider
      theme="light"
      className="sider"
      width={"15vw"}
      style={{
        position: "fixed",
        height: "87vh",
        overflow: "auto",
        borderLeft: "1px solid rgb(211, 211, 211)",
        textAlign: "center",
      }}
    >
      {created.length !== 0 ? (
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[created[0].id.toString()]}
          defaultOpenKeys={["created"]}
        >
          <Menu.SubMenu key={"created"} title={"我创建的歌单"}>
            {created.map((item: any) => {
              return (
                <Menu.Item
                  style={{ height: "60px", paddingLeft: "24px" }}
                  key={item.id}
                  onClick={() => {
                    navigator(`./${item.id}`);
                  }}
                >
                  <SiderItem info={item} />
                </Menu.Item>
              );
            })}
          </Menu.SubMenu>
          <Menu.SubMenu key={"favour"} title={"我收藏的歌单"}>
            {favour.map((item: any) => {
              return (
                <Menu.Item
                  style={{ height: "60px", paddingLeft: "24px" }}
                  key={item.id}
                  onClick={() => {
                    navigator(`./${item.id}`);
                  }}
                >
                  <SiderItem info={item} />
                </Menu.Item>
              );
            })}
          </Menu.SubMenu>
        </Menu>
      ) : (
        <Spin tip="loading......" style={{ marginTop: "40vh" }} />
      )}
    </Layout.Sider>
  );
}
