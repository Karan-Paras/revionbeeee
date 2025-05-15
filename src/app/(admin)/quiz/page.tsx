import Footer from "@/components/footer/footer";
import LandingHeader from "@/components/headers/landing-header";
import Link from "next/link";

export default function Quiz() {
  return (
    <>
      <LandingHeader />
      <section className="act_bg relative bg-cover bg-no-repeat min-h-96">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 min-h-96 relative text-center items-center">
            <div className="col-span-2 pt-20">
              <h3 className="font-bold text-5xl text-white">Quiz</h3>
              <div className="flex justify-center gap-3 text-white my-5 uppercase">
                <div className="itm">
                  <Link className="text-white" href="">
                    Home
                  </Link>
                </div>
                /
                <div className="itm">
                  <Link className="text-white" href="">
                    Quiz
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#F6F6F6] py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 bg-white rounded-xl py-5 px-7">
            <div className="col-span-2">
              <h3 className="font-bold text-xl mb-4 pb-4 border-b border-[#D9D9D9] text-[#505050]">
                Number & Algebra/AA SL
              </h3>
              <h5 className="font-semibold text-base pb-4 text-[#505050]">
                Number & Algebra/AA SL
              </h5>
              <p className="text-[#505050] mb-3">
                Analysis and Approaches – Standard Level (AA SL) is designed for
                students who enjoy exploring mathematical concepts through
                analytical thinking and problem-solving. This course focuses on
                developing a strong foundation in algebra, functions, geometry,
                trigonometry, and calculus. Students will engage with both
                theoretical and practical problems, learning to construct
                logical arguments and apply mathematical techniques to real and
                abstract scenarios.
              </p>
              <p className="text-[#505050] mb-3">
                Through engaging quizzes and interactive exercises, students
                will learn how to perform operations, simplify expressions,
                solve equations, and understand formulas. These skills lay the
                foundation for more advanced math and real-life problem-solving.
              </p>
              <p className="text-[#505050] mb-3">
                AA SL is ideal for learners who are interested in mathematics as
                a subject of study or for future careers in science,
                engineering, technology, or mathematics-based fields.{" "}
              </p>
            </div>
            <div className="flex justify-center col-span-2">
              <button className="inline-flex gap-2 font-medium rounded-xl items-center bg-[#53A2EB] px-10 py-4 my-5  text-white mx-auto">
                <span>
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                    <path
                      d="M2.73747 17.015C1.22567 17.8822 0 17.1718 0 15.4295V2.57242C0 0.828419 1.22567 0.118927 2.73747 0.985298L13.9752 7.43008C15.4876 8.29758 15.4876 9.70305 13.9752 10.5703L2.73747 17.015Z"
                      fill="white"
                    />
                  </svg>
                </span>{" "}
                Start Quiz{" "}
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
