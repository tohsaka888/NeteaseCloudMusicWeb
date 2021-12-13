import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getTopArtists } from "../../request/HomePage/Artists";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  border-bottom: 1px solid gray;
  padding: 3px 5px;
  margin: 8px 10px;
  font-size: 12px;
`;

const More = styled.div`
  font-weight: normal;
`;

const Item = styled.div`
  margin: 5px 5%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  width: 90%;
  background-color: #fafafa;
  border: 1px solid #e9e9e9;
`;

const CoverImage = styled.img`
  width: 62px;
  height: 62px;
  float: left;
  margin-right: 24px;
`;

const Name = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

export default function TopArtists() {
  const [artists, setArtists] = useState<any[]>([]);
  useEffect(() => {
    const sendRequest = async () => {
      const data = await getTopArtists();
      setArtists(data);
    };
    sendRequest();
  }, []);
  return (
    <>
      <Title>
        入驻歌手<More>查看全部{" >"}</More>
      </Title>
      <Container>
        {artists.map((item) => {
          return (
            <Item key={item.id}>
              <CoverImage src={item.picUrl} />
              <div>
                <Name>{item.name}</Name>
                <div>{item.alias[0] || "暂无"}</div>
              </div>
            </Item>
          );
        })}
      </Container>
    </>
  );
}
