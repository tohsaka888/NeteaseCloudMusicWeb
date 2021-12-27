import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLoginStatus from "../../hooks/useLoginStatus";
import { getUserPlaylist } from "../../request/my/Sider";
import "../../styles/MyMusic.css";

export default function Sider() {
  const loginStatus = useLoginStatus();
  const params = useParams();
  const [playlists, setPlaylists] = useState<any[]>([]);
  const navigator = useNavigate();
  useEffect(() => {
    const sendRequest = async () => {
      if (loginStatus.code === 200) {
        const id = loginStatus.profile.userId || 0;
        if (id) {
          const data = await getUserPlaylist(id);
          if (data.code === 200) {
            setPlaylists(data.playlist);
            if (!params.id) {
              navigator(`./${data.playlist[0].id}`);
            }
          }
        }
      }
    };
    sendRequest();
  }, [loginStatus, navigator, params.id]);

  return (
    <Layout.Sider
      theme="light"
      className="sider"
      style={{
        position: "fixed",
        height: "87vh",
        overflow: "auto",
        borderLeft: "2px solid #f9f9f9",
      }}
    >
      {playlists.length && (
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[playlists[0].id.toString()]}
        >
          {playlists.map((item: any) => {
            return (
              <Menu.Item
                key={item.id}
                onClick={() => {
                  navigator(`./${item.id}`);
                }}
              >
                {item.name}
              </Menu.Item>
            );
          })}
        </Menu>
      )}
    </Layout.Sider>
  );
}
