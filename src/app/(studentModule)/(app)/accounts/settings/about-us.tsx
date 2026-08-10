import { RevisionBee } from "@/assets/icons";

export function AboutUs() {
  return (
    <>
      <div className="flex size-40 items-center justify-center rounded-full bg-[#FFFAEB] mb-4">
        <RevisionBee width={100} />
      </div>
      <div className="desc">
        <h4 className="text-xl font-bold text-start">
          <span className="emoji">🐝</span> About Us - RevisionBee
        </h4>
        <p>
          At RevisionBee, we believe every student deserves access to
          high-quality math resources. Our mission is to make IB Math
          preparation engaging, effective, and accessible for learners around
          the world.
        </p>
        <p>Built by experienced educators, RevisionBee offers:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <span className="emoji">🧠</span> A vast question bank filled with
            IB-style problems tailored to your syllabus
          </li>
          <li>
            <span className="emoji">🧪</span> Interactive quizzes that adapt to
            your progress and skill level
          </li>
          <li>
            <span className="emoji">📈</span> Real-time progress tracking to
            monitor your growth and identify areas for improvement
          </li>
          <li>
            <span className="emoji">🎥</span> Topic explanation videos and
            strategy breakdowns created by our team to help you master even the
            trickiest concepts step-by-step
          </li>
        </ul>
        <h5 className="font-semibold mt-4">
          <span className="emoji">🐝</span> Track Your Progress
        </h5>
        <p>
          As you complete quizzes and challenges, RevisionBee keeps track of
          your scores, completed topics, and improvement over time.
        </p>

        <h5 className="font-semibold mt-4">
          <span className="emoji">🐝</span> Three Difficulty Levels
        </h5>
        <p>
          Every learner in our hive works at their own pace — that&apos;s why
          RevisionBee offers questions across three clear difficulty levels,
          each marked with a friendly bee-themed badge:
        </p>
        <ul className="pl-5 mt-2 space-y-1">
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
            &nbsp; — A good challenge with multi-step problems, combining ideas,
            and questions designed to deepen your understanding.
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

        <h5 className="font-semibold mt-4">
          <span className="emoji">🎥</span> Coming Soon: Video Tutorials
        </h5>
        <p>
          We know some topics need a little extra explanation — so we&apos;re
          creating exclusive RevisionBee video tutorials for select topics.
          These videos will walk you through key strategies, worked examples,
          and revision tips to give you that extra boost before your exams.
        </p>
        <p>
          Join our buzzing community today and take your IB Math revision to the
          next level. <span className="emoji">🐝✨</span>
          <br />
          <strong>RevisionBee — Smart Math. Sweet Success.</strong>
        </p>
      </div>
    </>
  );
}
