import React from "react";
import { Image } from "@chakra-ui/react";

type Props = {
  i: number;
  item: any;
  value: any;
  onClick: any;
};

export default function ShowImage({ i, item, value, onClick }: Props) {
  return (
    <Image
      onClick={onClick}
      key={i}
      marginRight={"8px"}
      marginTop={"8px"}
      border={"1px solid #cecece"}
      cursor={"pointer"}
      maxWidth={
        item.pics.length === 1
          ? value.width === value.height
            ? "338px"
            : "178px"
          : "110px"
      }
      maxHeight={item.pics.length === 1 ? "338px" : "110px"}
      minWidth={"110px"}
      minHeight={"110px"}
      src={value.originUrl}
      width={value.width + "px"}
      height={value.height + "px"}
    />
  );
}
