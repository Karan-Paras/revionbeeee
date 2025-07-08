import { RevisionBee } from "@/lib/icons";

export function AboutUs() {
  return (
    <section className="px-10 py-20 xl:px-20 2xl:px-0">
      <div className="container mx-auto space-y-10">
        <div className="flex">
          <div className="flex size-40 items-center justify-center rounded-full bg-[#FFFAEB] mb-4">
            <RevisionBee width={65} />
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-bold">
            <span className="emoji">🐝</span> About Us - RevisionBee
          </h3>
          <p className="mb-5">
            At RevisionBee, we believe every student deserves access to
            high-quality math resources. Our mission is to make IB Math
            preparation engaging, effective, and accessible for learners around
            the world.
          </p>
          <p className="mb-5">
            Built by experienced educators, RevisionBee offers:
          </p>
          <ul className="list-disc pl-6 mb-5 space-y-2">
            <li>
              <span className="emoji">🧠</span> A vast question bank filled with
              IB-style problems tailored to your syllabus
            </li>
            <li>
              <span className="emoji">🧪</span> Interactive quizzes that adapt
              to your progress and skill level
            </li>
            <li>
              📈 Real-time progress tracking to monitor your growth and identify
              areas for improvement
            </li>
            <li>
              <span className="emoji">🎥</span> Topic explanation videos and
              strategy breakdowns created by our team to help you master even
              the trickiest concepts step-by-step
            </li>
          </ul>

          <h4 className="text-xl font-semibold mt-8 mb-2">
            <span className="emoji">🐝</span> Track Your Progress
          </h4>
          <p className="mb-5">
            As you complete quizzes and challenges, RevisionBee keeps track of
            your scores, completed topics, and improvement over time.
          </p>

          <h4 className="text-xl font-semibold mt-8 mb-2">
            <span className="emoji">🐝</span> Three Difficulty Levels
          </h4>
          <p className="mb-4">
            Every learner in our hive works at their own pace — that&apos;s why
            RevisionBee offers questions across three clear difficulty levels,
            each marked with a friendly bee-themed badge:
          </p>
          <ul className="pl-6 mb-5 space-y-2">
            <li>
              <span className="emoji">🟢</span>&nbsp;
              <strong>
                <span className="emoji">🐝</span> BuzzEasy (Easy)
              </strong>
              &nbsp; — Great for quick warm-ups, building confidence, and
              reinforcing core skills.
            </li>
            <li>
              <span className="emoji">🟡</span>&nbsp;
              <strong>
                <span className="emoji">🐝</span> HoneyChallenge (Intermediate)
              </strong>
              &nbsp; — A good challenge with multi-step problems, combining
              ideas, and questions designed to deepen your understanding.
            </li>
            <li>
              <span className="emoji">🔴</span>&nbsp;
              <strong>
                <span className="emoji">🐝</span> HiveMaster (Advanced)
              </strong>
              &nbsp; — Thought-provoking and demanding questions for those ready
              to test themselves with complex reasoning and problem-solving.
            </li>
          </ul>

          <h4 className="text-xl font-semibold mt-8 mb-2">
            <span className="emoji">🎥</span> Coming Soon: Video Tutorials
          </h4>
          <p className="mb-5">
            We know some topics need a little extra explanation — so we&apos;re
            creating exclusive RevisionBee video tutorials for select topics.
            These videos will walk you through key strategies, worked examples,
            and revision tips to give you that extra boost before your exams.
          </p>
          <p>
            Join our buzzing community today and take your IB Math revision to
            the next level. <span className="emoji">🐝✨</span>
            <br />
            <strong>RevisionBee — Smart Math. Sweet Success.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
