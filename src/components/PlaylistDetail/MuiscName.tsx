import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type Props = {
  value: any;
  record: any;
  index: number;
};

const Text = styled.div`
  color: #333333;
  cursor: pointer;
  :hover {
    color: red;
    font-weight: bold;
    text-shadow: 1px 1px 1px #cecece;
  }
`;

export default function MuiscName({ value, record, index }: Props) {
  const navigator = useNavigate();
  return (
    <Text
      onClick={() => {
        navigator(`/song/${record.id}`);
      }}
    >
      {value}
    </Text>
  );
}
