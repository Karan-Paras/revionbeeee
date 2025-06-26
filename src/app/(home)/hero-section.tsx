"use client";

import { Hero } from "@/lib/assets";
import { MoveUpRight } from "@/lib/icons";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

export function HeroSection() {
  const controls = useAnimationControls();
  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      });

      await controls.start({
        x: "0%",
        transition: { duration: 1.2, ease: "easeOut" },
      });

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
      className="relative min-h-screen overflow-hidden bg-top lg:px-20 2xl:px-0"
    >
      <video
        className="absolute top-0 left-0 z-[-1] h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src={Hero}
      />
      <div className="container mx-auto">
        <div className="grid min-h-screen grid-cols-2 content-center">
          <div className="relative col-span-2 mx-auto w-10/12 text-center lg:w-8/12 xl:w-7/12 2xl:w-6/12">
            <motion.h1
              initial={{ y: 50, opacity: 0, x: 1 }}
              animate={controls}
              className="mb-5 text-5xl font-bold text-white"
            >
              Buzzing with Knowledge
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              custom="paragraph"
              animate={controls}
              className="mb-5 text-lg font-normal text-white"
            >
              Empowering curious minds through engaging quizzes, smart study
              tools, and interactive learning experiences daily
            </motion.p>

            <button className="group mx-auto flex cursor-pointer items-center gap-2 rounded-2xl border border-[#FBBE1B] px-8 py-4 text-[#FBBE1B] hover:bg-[#FBBE1B] hover:text-black">
              Get Started
              <span>
                <MoveUpRight
                  className="group-hover:fill-[#000]"
                  color="#FBBE1B"
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
