"use client";

import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

export function HeroSection() {
  const controls = useAnimationControls();

  useEffect(() => {
    const sequence = async () => {
      // Animate heading
      await controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      });

      // Animate shine
      await controls.start({
        x: "0%",
        transition: { duration: 1.2, ease: "easeOut" },
      });

      // Animate paragraph
      await controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" },
      });
    };

    sequence();
  }, [controls]);

  return (
    <section
      id="home"
      className="relative hero_bg bg-no-repeat bg-cover bg-top 2xl:px-0 lg:px-20"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-2 content-center min-h-screen">
          <div className="col-span-2 text-center lg:w-6/12 w-10/12 mx-auto relative">
            <motion.h1
              initial={{ y: 50, opacity: 0, x: 1 }}
              animate={controls}
              className="font-bold text-white text-5xl mb-5"
            >
              Buzzing with Knowledge
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              custom="paragraph"
              animate={controls}
              className="font-normal text-lg text-white mb-5"
            >
              Empowering curious minds through engaging quizzes, smart study
              tools, and interactive learning experiences daily
            </motion.p>

            <button className="flex gap-2 items-center mx-auto text-[#FBBE1B] py-4 px-8 rounded-2xl border-[#FBBE1B] border  cursor-pointer group hover:bg-[#FBBE1B] hover:text-black">
              Get Started{" "}
              <span>
                <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
                  <path
                    className="group-hover:fill-[#000]"
                    d="M10.8371 4.19204L1.52916 13.5L0 11.9708L9.30688 2.66288H1.10415V0.5H13V12.3958H10.8371V4.19204Z"
                    fill="#FBBE1B"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
