"use client";

import { MoveUpRight } from "@/assets/icons";
import { Hero } from "@/assets/videos";
import { getPostLoginPath } from "@/features/auth/utils";
import { paths } from "@/routes";
import { motion, useAnimationControls } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function HeroSection() {
  const router = useRouter();
  const { data: session } = useSession();

  function handleGetStarted() {
    if (!session?.user) {
      router.push(paths.login());
      return;
    }

    router.push(
      getPostLoginPath(
        session.user.userType,
        session.user.teacherProfileStatus,
        session.user.profileStatus
      )
    );
  }

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
      id={paths.home.hero().split("#")[1]}
      className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-top px-4 sm:min-h-[calc(100svh-82px)] lg:min-h-screen lg:px-20 2xl:px-0"
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
        <div className="grid min-h-[calc(100svh-72px)] grid-cols-2 content-center py-16 sm:min-h-[calc(100svh-82px)] lg:min-h-screen lg:py-20">
          <div className="relative col-span-2 mx-auto w-full max-w-[680px] text-center sm:w-10/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12">
            <motion.h1
              initial={{ y: 50, opacity: 0, x: 1 }}
              animate={controls}
              className="mb-4 text-[40px] leading-[1.06] font-bold text-white sm:mb-5 sm:text-5xl lg:text-6xl"
            >
              Buzzing with Knowledge
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              custom="paragraph"
              animate={controls}
              className="mx-auto mb-5 max-w-[620px] text-base leading-7 font-normal text-white sm:text-lg"
            >
              Empowering curious minds through engaging quizzes, smart study
              tools, and interactive learning experiences daily
            </motion.p>

            <button
              onClick={handleGetStarted}
              className="group mx-auto flex cursor-pointer items-center gap-2 rounded-2xl border border-[#FBBE1B] px-6 py-3.5 text-sm font-semibold text-[#FBBE1B] hover:bg-[#FBBE1B] hover:text-black sm:px-8 sm:py-4 sm:text-base"
            >
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
