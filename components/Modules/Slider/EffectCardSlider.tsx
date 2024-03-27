import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Link from "next/link";
import { Divider } from "@nextui-org/react";

export default function EffectCardSlider({
  href,
  title,
  data,
  Content,
}: {
  href: string;
  title: string;
  data: any[];
  Content: React.ElementType;
}) {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Swiper
      dir="ltr"
      effect={"cards"}
      grabCursor={true}
      direction={windowWidth > 1400 ? "horizontal" : "vertical"}
      modules={[EffectCards]}
      className="w-[80%] sm:w-[92%] md:w-[85%] xl:w-[75%] h-[450px] sm:h-[235px] md:h-[280px] lg:h-[320px] dark:bg-opacity-10"
    >
      {data.map((item, index) => (
        <SwiperSlide key={index} className="bg-white-100 dark:bg-dark">
          <Content {...item} />
        </SwiperSlide>
      ))}
      {title && (
        <Link
          href={`${href}`}
          className="md:col-start-3 col-span-1 mx-auto md:ms-auto md:mx-0 flex items-center gap-x-2 lg:mb-10 mb-8 text-LightTitle dark:text-DarkTitle"
        >
          <Divider className="w-[30px] bg-black-400 dark:bg-white-100" />
          {title}
        </Link>
      )}
    </Swiper>
  );
}
