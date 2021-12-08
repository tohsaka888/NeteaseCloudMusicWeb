import { Carousel, message } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BannerContext } from "../../context/HomePage/Context";
import { sendRequest } from "../../request/HomePage/Banner";
import SwitchButton from "./SwitchButton";

type ContainerProps = {
  currentUrl: string;
};

const Container = styled.div<ContainerProps>`
  /* height: 40vh; */
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 18vw;
  box-sizing: border-box;
  /* position: absolute; */
  background-image: ${({ currentUrl }) =>
    `url(${currentUrl}?imageView&blur=40x20)`};
`;

const ImageArea = styled.div`
  width: 48vw;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Download = styled.div`
  width: 16vw;
  height: 273px;
  position: absolute;
  background-image: url("https://s2.music.126.net/style/web2/img/index/download.png?b6cf2647cb3dbaedebebeb422d2f0268");
  float: right;
  z-index: 1000;
  left: 66vw;
  cursor: pointer;
  background-size: cover;
`;

export default function Banner() {
  const [banners, setBanners] = useState<any[]>([]);
  const bannerRef = useRef<CarouselRef>();
  useEffect(() => {
    const getBanners = async () => {
      const data = await sendRequest();
      if (!data.fail) {
        setBanners(data);
      } else {
        message.error({ content: data.errmsg, key: "networkError" });
      }
    };
    getBanners();
  }, []);
  return (
    <BannerContext.Provider value={{ bannerRef: bannerRef }}>
      <Download />
      <SwitchButton direction="left" />
      <SwitchButton direction="right" />
      <Carousel
        ref={(refs) => {
          if (refs) {
            bannerRef.current = refs;
          }
        }}
        dots={{ className: "dots" }}
        autoplay
        effect="fade"
      >
        {banners.map((item, index) => {
          return (
            <Container key={index} currentUrl={item.imageUrl}>
              <ImageArea>
                <BannerImage src={item.imageUrl} />
              </ImageArea>
            </Container>
          );
        })}
      </Carousel>
    </BannerContext.Provider>
  );
}
