// import { PlayCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import styled from "styled-components";
import MuiscName from "./MuiscName";
// import usePlayMusic from "../../hooks/usePlayMusic";
import TableIndex from "./TableIndex";

// const Index = styled.div`
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   color: #333333;
// `;

const TextEllpsis = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const columns: ColumnsType<any> = [
  {
    title: "",
    dataIndex: "index",
    key: "index",
    width: "10%",
    ellipsis: true,
    render: (value, record, index) => {
      return <TableIndex value={value} record={record} index={index} />;
    },
  },
  {
    title: "歌曲标题",
    dataIndex: "name",
    key: "name",
    width: "40%",
    ellipsis: true,
    render: (value, record, index) => (
      <MuiscName value={value} record={record} index={index} />
    ),
  },
  {
    title: "时长",
    dataIndex: "dt",
    key: "dt",
    width: "10%",
    ellipsis: true,
    render: (value) => (
      <TextEllpsis>{moment(value).format("mm:ss")}</TextEllpsis>
    ),
  },
  {
    title: "歌手",
    dataIndex: "ar",
    key: "ar",
    width: "20%",
    ellipsis: true,
    render: (value) => (
      <TextEllpsis>
        {value.length !== 0 &&
          value.map((item: any) => {
            return item.name;
          })}
      </TextEllpsis>
    ),
  },
  {
    title: "专辑",
    dataIndex: "al",
    key: "al",
    width: "20%",
    ellipsis: true,
    render: (value) => <TextEllpsis>{value.name}</TextEllpsis>,
  },
];
