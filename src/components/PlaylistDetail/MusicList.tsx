import { Table } from "antd";
import React from "react";
import styled from "styled-components";
import { columns } from "./Columns";

type Props = {
  info: any;
};

const Title = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 0px 15px 0px 32px;
  border-bottom: 2px solid #c20c0c;
  justify-content: space-between;
`;

const LargeSize = styled.div`
  font-size: 20px;
  font-weight: normal;
  margin-right: 24px;
`;

type SmallSizeProps = {
  color?: string;
};

const SmallSize = styled.div<SmallSizeProps>`
  font-size: 12px;
  color: ${({ color }) => color || "#666"};
  margin-bottom: 3px;
`;

const Flex = styled.div`
  display: flex;
  align-items: flex-end;
  padding-bottom: 5px;
`;

export default function MusicList({ info }: Props) {
  return (
    <>
      <Title>
        <Flex>
          <LargeSize>歌曲列表</LargeSize>
          <SmallSize>{info.trackCount}首歌</SmallSize>
        </Flex>
        <Flex>
          <SmallSize>播放:&nbsp;</SmallSize>
          <SmallSize color={"#c20c0c"}>{info.playCount}</SmallSize>
          <SmallSize>次</SmallSize>
        </Flex>
      </Title>
      <Table
        size="small"
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={info.tracks}
        pagination={{ pageSize: 50 }}
      />
    </>
  );
}
