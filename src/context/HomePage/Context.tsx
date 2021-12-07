import { createContext, MutableRefObject } from "react";
import { CarouselRef } from "antd/lib/carousel";

type Props = {
  bannerRef: MutableRefObject<CarouselRef | undefined>;
};

const BannerContext = createContext<Props | null>(null);

export { BannerContext };
