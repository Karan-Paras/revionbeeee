import { RevisionBee } from "@/lib/icons";

export function AboutUs() {
  return (
    <>
      <div className="flex size-40 items-center justify-center rounded-full bg-[#FFFAEB]">
        <RevisionBee width={100} />
      </div>
      <div className="desc">
        <h4 className="text-xl font-bold text-start">About Us</h4>
        <p>
          Welcome to Revision Bee, your go-to destination for fun and engaging
          math quizzes designed specifically for students! Our mission is to
          make math exciting, accessible, and rewarding for learners of all
          ages. Whether you&apos;re brushing up on basic arithmetic or tackling
          more advanced topics like algebra and geometry, our interactive
          quizzes are here to support your learning journey.
        </p>
        <p>
          At Revision Bee, we believe that learning math doesn&apos;t have to be
          boring. That&apos;s why we&apos;ve created a variety of quiz levels,
          challenges, and game-based formats to keep you motivated and
          entertained while you learn. Each quiz is carefully designed to match
          curriculum standards and help you practice essential skills at your
          own pace.
        </p>
        <p>
          Join thousands of students who are transforming the way they learn
          math. Whether you&apos;re studying for an exam or just love a good
          challenge, Revision Bee is here to make math your new favorite
          subject. Start quizzing today and discover the fun side of math!
        </p>
      </div>
    </>
  );
}
