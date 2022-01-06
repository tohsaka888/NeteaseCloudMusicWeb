import { Carousel, message } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BannerContext } from "../../context/HomePage/Context";
import { sendRequest } from "../../request/HomePage/Banner";
import LoadingArea from "../Common/LoadingArea";
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
  padding: 0 auto;
  box-sizing: border-box;
  display: flex;
  /* position: absolute; */
  background-image: ${({ currentUrl }) =>
    `url(${currentUrl}?imageView&blur=40x20)`};
`;

const ImageArea = styled.div`
  width: 64vw;
  min-width: 950px;
  /* position: relative; */
  margin: 0 auto;
  display: flex;
  min-height: 272px;
`;

const BannerImage = styled.img`
  width: 48vw;
  height: 100%;
  min-width: 75%;
  min-height: 272px !important;
  /* position: sticky; */
`;

const Download = styled.div`
  width: 16vw;
  height: 273px;
  min-width: 25% !important;
  min-height: 273px;
  /* position: absolute; */
  background-image: url("https://s2.music.126.net/style/web2/img/index/download.png?b6cf2647cb3dbaedebebeb422d2f0268");
  z-index: 10;
  cursor: pointer;
  background-size: cover;
  min-width: 200px;
  overflow: hidden;
  top: 0px;
  border-bottom: 8px solid #222222;
  /* display: inline; */
  /* position: absolute; */
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
      <SwitchButton direction="left" />
      <SwitchButton direction="right" />
      {banners.length !== 0 ? (
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
                  <Download />
                </ImageArea>
              </Container>
            );
          })}
        </Carousel>
      ) : (
        <LoadingArea
          height="273px"
          width="64vw"
          style={{
            backgroundColor: "white",
            marginLeft: "auto",
            marginRight: "auto",
            minWidth: "950px",
          }}
        />
      )}
    </BannerContext.Provider>
  );
}
