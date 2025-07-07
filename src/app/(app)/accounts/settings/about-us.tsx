import { RevisionBee } from "@/lib/icons";

export function AboutUs() {
  return (
    <>
      <div className="flex size-40 items-center justify-center rounded-full bg-[#FFFAEB]">
        <RevisionBee width={100} />
      </div>
      <div className="desc">
        <h4 className="text-xl font-bold text-start">
          🐝 About Us - RevisionBee
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
            🧠 A vast question bank filled with IB-style problems tailored to
            your syllabus
          </li>
          <li>
            🧪 Interactive quizzes that adapt to your progress and skill level
          </li>
          <li>
            📈 Real-time progress tracking to monitor your growth and identify
            areas for improvement
          </li>
          <li>
            🎥 Topic explanation videos and strategy breakdowns created by our
            team to help you master even the trickiest concepts step-by-step
          </li>
        </ul>
        <h5 className="font-semibold mt-4">🐝 Track Your Progress</h5>
        <p>
          As you complete quizzes and challenges, RevisionBee keeps track of
          your scores, completed topics, and improvement over time.
        </p>

        <h5 className="font-semibold mt-4">🐝 Three Difficulty Levels</h5>
        <p>
          Every learner in our hive works at their own pace — that&apos;s why
          RevisionBee offers questions across three clear difficulty levels,
          each marked with a friendly bee-themed badge:
        </p>
        <ul className="pl-5 mt-2 space-y-1">
          <li>
            🟢 <strong>🐝 BuzzEasy (Easy)</strong> — Great for quick warm-ups,
            building confidence, and reinforcing core skills.
          </li>
          <li>
            🟡 <strong>🐝 HoneyChallenge (Intermediate)</strong> — A good
            challenge with multi-step problems, combining ideas, and questions
            designed to deepen your understanding.
          </li>
          <li>
            🔴 <strong>🐝 HiveMaster (Advanced)</strong> — Thought-provoking and
            demanding questions for those ready to test themselves with complex
            reasoning and problem-solving.
          </li>
        </ul>

        <h5 className="font-semibold mt-4">🎥 Coming Soon: Video Tutorials</h5>
        <p>
          We know some topics need a little extra explanation — so we&apos;re
          creating exclusive RevisionBee video tutorials for select topics.
          These videos will walk you through key strategies, worked examples,
          and revision tips to give you that extra boost before your exams.
        </p>
        <p>
          Join our buzzing community today and take your IB Math revision to the
          next level. 🐝✨
          <br />
          <strong>RevisionBee — Smart Math. Sweet Success.</strong>
        </p>
      </div>
    </>
  );
}
