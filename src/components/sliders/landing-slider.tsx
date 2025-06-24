"use client";

import Image from "next/image";
import Slider from "react-slick";

import { SubTwo } from "@/lib/assets";
import { Quote } from "@/lib/icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function LandingSlider() {
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
        {[...Array(3)].map((_, index) => (
          <div key={index} className="item p-3">
            <div className="relative grid grid-cols-7 items-center rounded-2xl border border-[#E2E2E2] p-4 lg:gap-2 xl:gap-5">
              <div className="img col-span-7 lg:col-span-3 xl:col-span-3">
                <div className="img_blk mx-auto overflow-hidden rounded-full lg:size-32 xl:size-44">
                  <Image src={SubTwo} alt="Slide 1" />
                </div>
                <div className="dsc text-center lg:mt-3 xl:mt-4">
                  <h4 className="text-xl font-semibold">Esther Howard</h4>
                  <p className="text-sm text-[#787878]">Student</p>
                </div>
              </div>
              <div className="col-span-7 lg:col-span-4">
                <div className="itm">
                  <h3 className="text-center text-2xl font-bold md:text-left">
                    Loved the Quiz !
                  </h3>
                  <p className="text-center text-sm text-[#505050] md:text-left">
                    Discover how our fun and challenging quizzes are helping
                    students boost their confidence, sharpen their skills, and
                    fall in love with math!
                  </p>
                  <div className="itm flex justify-center md:justify-start lg:mt-2 xl:mt-3">
                    <svg
                      width="133"
                      height="24"
                      viewBox="0 0 133 24"
                      fill="none"
                    >
                      <path
                        d="M11.8554 0.755859C12.0403 0.427829 12.5126 0.427829 12.6975 0.75586L15.8499 6.34876C15.9189 6.47114 16.0377 6.55745 16.1754 6.58524L22.4687 7.85504C22.8378 7.92951 22.9838 8.37877 22.7289 8.65598L18.3839 13.3824C18.2889 13.4858 18.2435 13.6255 18.2596 13.765L18.9967 20.1427C19.0399 20.5168 18.6578 20.7944 18.3154 20.6377L12.4776 17.9659C12.3499 17.9074 12.203 17.9074 12.0753 17.9659L6.23752 20.6377C5.89513 20.7944 5.51297 20.5168 5.5562 20.1427L6.29329 13.765C6.30942 13.6255 6.26404 13.4858 6.16897 13.3824L1.82394 8.65598C1.5691 8.37877 1.71508 7.92951 2.08419 7.85504L8.37749 6.58524C8.5152 6.55745 8.634 6.47114 8.70297 6.34876L11.8554 0.755859Z"
                        fill="#FBBE1B"
                      />
                      <path
                        d="M38.9237 0.755859C39.1086 0.427829 39.581 0.427829 39.7659 0.75586L42.9183 6.34876C42.9873 6.47114 43.1061 6.55745 43.2438 6.58524L49.5371 7.85504C49.9062 7.92951 50.0521 8.37877 49.7973 8.65598L45.4523 13.3824C45.3572 13.4858 45.3118 13.6255 45.328 13.765L46.0651 20.1427C46.1083 20.5168 45.7261 20.7944 45.3837 20.6377L39.546 17.9659C39.4182 17.9074 39.2714 17.9074 39.1436 17.9659L33.3059 20.6377C32.9635 20.7944 32.5813 20.5168 32.6246 20.1427L33.3616 13.765C33.3778 13.6255 33.3324 13.4858 33.2373 13.3824L28.8923 8.65598C28.6375 8.37877 28.7834 7.92951 29.1525 7.85504L35.4459 6.58524C35.5836 6.55745 35.7024 6.47114 35.7713 6.34876L38.9237 0.755859Z"
                        fill="#FBBE1B"
                      />
                      <path
                        d="M65.9921 0.755859C66.177 0.427829 66.6494 0.427829 66.8342 0.75586L69.9866 6.34876C70.0556 6.47114 70.1744 6.55745 70.3121 6.58524L76.6054 7.85504C76.9745 7.92951 77.1205 8.37877 76.8657 8.65598L72.5206 13.3824C72.4256 13.4858 72.3802 13.6255 72.3963 13.765L73.1334 20.1427C73.1766 20.5168 72.7945 20.7944 72.4521 20.6377L66.6143 17.9659C66.4866 17.9074 66.3397 17.9074 66.212 17.9659L60.3742 20.6377C60.0319 20.7944 59.6497 20.5168 59.6929 20.1427L60.43 13.765C60.4461 13.6255 60.4008 13.4858 60.3057 13.3824L55.9607 8.65598C55.7058 8.37877 55.8518 7.92951 56.2209 7.85504L62.5142 6.58524C62.6519 6.55745 62.7707 6.47114 62.8397 6.34876L65.9921 0.755859Z"
                        fill="#FBBE1B"
                      />
                      <path
                        d="M93.0604 0.755859C93.2453 0.427829 93.7177 0.427829 93.9026 0.75586L97.055 6.34876C97.124 6.47114 97.2428 6.55745 97.3805 6.58524L103.674 7.85504C104.043 7.92951 104.189 8.37877 103.934 8.65598L99.589 13.3824C99.4939 13.4858 99.4486 13.6255 99.4647 13.765L100.202 20.1427C100.245 20.5168 99.8628 20.7944 99.5204 20.6377L93.6827 17.9659C93.5549 17.9074 93.4081 17.9074 93.2804 17.9659L87.4426 20.6377C87.1002 20.7944 86.718 20.5168 86.7613 20.1427L87.4984 13.765C87.5145 13.6255 87.4691 13.4858 87.374 13.3824L83.029 8.65598C82.7742 8.37877 82.9202 7.92951 83.2893 7.85504L89.5826 6.58524C89.7203 6.55745 89.8391 6.47114 89.9081 6.34876L93.0604 0.755859Z"
                        fill="#FBBE1B"
                      />
                      <path
                        d="M123.701 6.58594C123.822 6.80016 124.019 6.95962 124.251 7.0332L124.353 7.05859L130.646 8.3291L126.301 13.0557C126.135 13.2366 126.044 13.4727 126.046 13.7158L126.052 13.8203L126.789 20.1982L120.951 17.5264C120.728 17.4241 120.475 17.4116 120.244 17.4883L120.146 17.5264L114.309 20.1982L115.046 13.8203C115.074 13.5762 115.009 13.3315 114.864 13.1357L114.797 13.0557L110.452 8.3291L116.745 7.05859C116.986 7.01001 117.198 6.87233 117.34 6.6748L117.396 6.58594L120.549 0.993164L123.701 6.58594Z"
                        stroke="#D4D3D3"
                        strokeWidth="0.966722"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <Quote color="#53A2EB" />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
