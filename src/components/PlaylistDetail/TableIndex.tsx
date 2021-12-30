import { PlayCircleOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { MusicPlayContext } from "../../context/Context";
import usePlayMusic from "../../hooks/usePlayMusic";

const Index = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #333333;
`;

type Props = {
  record: any;
  value: any;
  index: number;
};

export default function TableIndex({ record, value, index }: Props) {
  const props = useContext(MusicPlayContext);
  const [color, setColor] = useState<string>("#333333");
  const playMusic = usePlayMusic();
  return (
    <Index>
      <div style={{ color: "#333333" }}>{index + 1}</div>
      <PlayCircleOutlined
        style={{ color: color }}
        onMouseOver={() => {
          setColor("red");
        }}
        onMouseLeave={() => {
          setColor("#333333");
        }}
        onClick={() => {
          playMusic(record.id);
          props?.setRecord(record);
        }}
      />
    </Index>
  );
}
