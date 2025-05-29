"use client";

import { Figure, HeroImg, Proff } from "@/lib/assets";
import { ChevronUp } from "@/lib/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useReducer } from "react";

type Index = 0 | 1 | 2 | 3 | 4 | 5 | -1;

type State = { visible: Index };

function reducer(state: State, action: State): State {
  if (action.visible !== undefined) {
    return { visible: action.visible };
  }
  return state;
}

export default function QuestionBank() {
  const [state, dispatch] = useReducer(reducer, { visible: -1 });

  const handleToggle = (index: Index) => {
    dispatch({ visible: state.visible === index ? -1 : index });
  };

  return (
    <>
      <section className="act_bg relative bg-cover bg-no-repeat min-h-96 md:px-0 px-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 min-h-96 relative text-center items-end">
            <div className="col-span-2 pb-14 ">
              <h3 className="font-bold text-5xl text-white">Question Bank</h3>
              <div className="flex justify-center gap-3 text-white my-5 uppercase">
                <div className="itm">
                  <Link className="text-white" href="">
                    Home
                  </Link>
                </div>
                /
                <div className="itm">
                  <Link className="text-white" href="">
                    AA SL
                  </Link>
                </div>
                /
                <div className="itm">
                  <Link className="text-white" href="">
                    Question Bank
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#F6F6F6] py-16 md:px-0 px-10">
        <div className="container mx-auto">
          {/* question */}
          <div className="item mb-5">
            {/* question head */}
            <h2 className="mb-5 font-bold text-2xl">Question 1</h2>
            <div className="itm_blk p-7 bg-white rounded-xl">
              <h3 className="font-semibold text-xl">
                Consider an arithmetic sequence 2, 6 , 10 ,14 ,..
              </h3>
              <ol className="list-[lower-alpha] px-5">
                <li className="">Find the common difference, </li>
                <li className="">Find the 10th term in the sequence</li>
                <li className="">
                  Find the sum of the first 10 terms in the sequence.
                </li>
              </ol>
              {/* button */}
              <button
                className="bg-[#F0F8FF] text-[#53A2EB] flex items-center rounded-xl font-semibold gap-2.5 py-3 px-5 mt-5"
                onClick={() => handleToggle(0)}
              >
                View Solution
                <ChevronUp
                  color="#53A2EB"
                  className={cn(
                    "transition-transform duration-300",
                    state.visible === 0 ? "rotate-180" : "rotate-0"
                  )}
                />
              </button>
              {/* answer */}
              <div className="py-5">
                {state.visible === 0 && (
                  <>
                    {/* text */}
                    <p>
                      The sequence 33, 55, 7, 7,… is not an arithmetic sequence
                      because the differences between consecutive terms are not
                      constant. Specifically, the difference between the first
                      two terms is 22, while the difference between the second
                      and third terms is -48. In an arithmetic sequence, the
                      difference between consecutive terms must always be the
                      same. Therefore, this sequence does not fit the definition
                      of an arithmetic sequence. If you intended a different
                      pattern or if there is a typo, please provide more
                      information or additional terms for clarification.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* question */}
          <div className="item mb-5">
            {/* question head */}
            <h2 className="mb-5 font-bold text-2xl">Question 2</h2>
            <div className="itm_blk p-7 bg-white rounded-xl">
              <h3 className="font-semibold text-xl">
                Consider the following sequence of figures.
              </h3>
              <Image src={Figure} alt="Figure" />
              <ol className="list-[lower-alpha] px-5">
                <li className="">Figure 1 contains 6 line segments.</li>
                <li className="">
                  Given that Figure n contains 101 line segments, show that
                </li>
                <li className="">
                  Find the total number of line segments in the first 20
                  figures.
                </li>
              </ol>
              {/* button */}
              <button
                className="bg-[#F0F8FF] text-[#53A2EB] flex items-center rounded-xl font-semibold gap-2.5 py-3 px-5 mt-5"
                onClick={() => handleToggle(1)}
              >
                View Solution
                <ChevronUp
                  color="#53A2EB"
                  className={cn(
                    "transition-transform duration-300",
                    state.visible === 1 ? "rotate-180" : "rotate-0"
                  )}
                />
              </button>
              {/* answer */}
              <div className="py-5">
                {state.visible === 1 && (
                  <div className="video h-[450px] overflow-hidden rounded-xl relative">
                    <Image className="object-cover" src={HeroImg} alt="" fill />
                    <div className="relative h-full w-full flex justify-center items-center bg-black/20">
                      {/* play  */}
                      <button className="size-20 bg-black border-white border rounded-full flex justify-center items-center cursor-pointer">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 20 23"
                          fill="none"
                        >
                          <path
                            d="M4.04963 0.682761C2.1427 -0.474249 0.59668 0.473587 0.59668 2.79812V19.9522C0.59668 22.279 2.1427 23.2256 4.04963 22.0697L18.2245 13.471C20.1321 12.3136 20.1321 10.4384 18.2245 9.28128L4.04963 0.682761Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                      <button className="size-20 bg-black border-white border rounded-full flex justify-center items-center hidden cursor-pointer">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 22 27"
                          fill="none"
                        >
                          <path
                            d="M9.24743 3.21741V24.008C9.24743 24.7599 8.94874 25.481 8.41706 26.0127C7.88538 26.5444 7.16426 26.8431 6.41235 26.8431H3.57727C2.82536 26.8431 2.10424 26.5444 1.57256 26.0127C1.04088 25.481 0.742188 24.7599 0.742188 24.008V3.21741C0.742188 2.4655 1.04088 1.74438 1.57256 1.2127C2.10424 0.68102 2.82536 0.382324 3.57727 0.382324H6.41235C7.16426 0.382324 7.88538 0.68102 8.41706 1.2127C8.94874 1.74438 9.24743 2.4655 9.24743 3.21741ZM18.6977 0.382324H15.8626C15.1107 0.382324 14.3896 0.68102 13.8579 1.2127C13.3262 1.74438 13.0275 2.4655 13.0275 3.21741V24.008C13.0275 24.7599 13.3262 25.481 13.8579 26.0127C14.3896 26.5444 15.1107 26.8431 15.8626 26.8431H18.6977C19.4496 26.8431 20.1707 26.5444 20.7024 26.0127C21.2341 25.481 21.5328 24.7599 21.5328 24.008V3.21741C21.5328 2.4655 21.2341 1.74438 20.7024 1.2127C20.1707 0.68102 19.4496 0.382324 18.6977 0.382324Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* question */}
          <div className="item mb-5">
            {/* question head */}
            <h2 className="mb-5 font-bold text-2xl">Question 3</h2>
            <div className="itm_blk p-7 bg-white rounded-xl">
              <h3 className="font-semibold text-xl">
                Prove that the sum of three consecutive positive integers is
                divisible by 3
              </h3>
              {/* button */}
              <button
                className="bg-[#F0F8FF] text-[#53A2EB] flex items-center rounded-xl font-semibold gap-2.5 py-3 px-5 mt-5"
                onClick={() => handleToggle(2)}
              >
                View Solution
                <ChevronUp
                  color="#53A2EB"
                  className={cn(
                    "transition-transform duration-300",
                    state.visible === 2 ? "rotate-180" : "rotate-0"
                  )}
                />
              </button>
              {/* answer */}
              <div className="py-5">
                {state.visible === 2 && (
                  <div className="img_blk overflow-hidden rounded-xl relative">
                    <Image className="object-cover" src={Proff} alt="" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* question */}
          <div className="item mb-5">
            {/* question head */}
            <h2 className="mb-5 font-bold text-2xl">Question 4</h2>
            <div className="itm_blk p-7 bg-white rounded-xl">
              <h3 className="font-semibold text-xl">
                Consider two consecutive positive integers , k and k+1 Show that
                the difference of their squares is equal to the sum of the two
                integers.
              </h3>
              {/* button */}
              <button
                className="bg-[#F0F8FF] text-[#53A2EB] flex items-center rounded-xl font-semibold gap-2.5 py-3 px-5 mt-5"
                onClick={() => handleToggle(3)}
              >
                View Solution
                <ChevronUp
                  color="#53A2EB"
                  className={cn(
                    "transition-transform duration-300",
                    state.visible === 3 ? "rotate-180" : "rotate-0"
                  )}
                />
              </button>
              {/* answer */}
              <div className="py-5">
                {state.visible === 3 && (
                  <div className="img_blk overflow-hidden rounded-xl relative">
                    <Image className="object-cover" src={Proff} alt="" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* question */}
          <div className="item mb-5">
            {/* question head */}
            <h2 className="mb-5 font-bold text-2xl">Question 5</h2>
            <div className="itm_blk p-7 bg-white rounded-xl">
              <h3 className="font-semibold text-xl">
                The product of three consecutive integers is increased by the
                middle integer. <br /> Prove that the result is a perfect cube.
              </h3>
              {/* button */}
              <button
                className="bg-[#F0F8FF] text-[#53A2EB] flex items-center rounded-xl font-semibold gap-2.5 py-3 px-5 mt-5"
                onClick={() => handleToggle(4)}
              >
                View Solution
                <ChevronUp
                  color="#53A2EB"
                  className={cn(
                    "transition-transform duration-300",
                    state.visible === 4 ? "rotate-180" : "rotate-0"
                  )}
                />
              </button>
              {/* answer */}
              <div className="py-5">
                {state.visible === 4 && (
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                    quas maiores id officia nemo dolore nihil nesciunt
                    reprehenderit numquam nisi nobis expedita minus, fugit
                    delectus illum corporis ut tenetur temporibus?
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* question */}
          <div className="item mb-5">
            {/* question head */}
            <h2 className="mb-5 font-bold text-2xl">Question 6</h2>
            <div className="itm_blk p-7 bg-white rounded-xl">
              <h3 className="font-semibold text-xl">
                Solve the following equation for a
              </h3>
              {/* button */}
              <button
                className="bg-[#F0F8FF] text-[#53A2EB] flex items-center rounded-xl font-semibold gap-2.5 py-3 px-5 mt-5"
                onClick={() => handleToggle(5)}
              >
                View Solution
                <ChevronUp
                  color="#53A2EB"
                  className={cn(
                    "transition-transform duration-300",
                    state.visible === 5 ? "rotate-180" : "rotate-0"
                  )}
                />
              </button>
              {/* answer */}
              <div className="py-5">
                {state.visible === 5 && (
                  <div className="img_blk overflow-hidden rounded-xl relative">
                    <Image className="object-cover" src={Proff} alt="" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
