"use client";

import { Camille, Jisso, Yara } from "@/assets/images";
import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export function TestimonialsSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="w-full xl:ml-[10%]">
      <Slider {...settings}>
        <div className="item p-3">
          <Image src={Yara} alt="" />
        </div>

        <div className="item p-3">
          <Image src={Camille} alt="" />
        </div>
        <div className="item p-3">
          <Image src={Jisso} alt="" />
        </div>
      </Slider>
    </div>
  );
}
