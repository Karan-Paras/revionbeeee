"use client";

import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { MoveUpRight } from "@/lib/icons";
import { IntroModal } from "@/app/(home)/intro-modal";

export function HeroSection() {
  const controls = useAnimationControls();

  const [showIntroModal, setShowIntroModal] = useState(true);

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
    <>
      {showIntroModal && (
        <IntroModal onClose={() => setShowIntroModal(false)} />
      )}
      <section
        id="home"
        className="relative min-h-screen overflow-hidden bg-top 2xl:px-0 lg:px-20 "
      >
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          autoPlay
          muted
          loop
          playsInline
          src="/videos/3591398943-preview.mp4"
        ></video>
        <div className="container mx-auto">
          <div className="grid grid-cols-2 content-center min-h-screen">
            <div className="col-span-2 text-center 2xl:w-6/12 xl:w-7/12 lg:w-8/12 w-10/12 mx-auto relative">
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
    </>
  );
}
