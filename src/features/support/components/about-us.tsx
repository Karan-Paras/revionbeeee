import { RevisionBee } from "@/lib/icons";

export function AboutUs() {
  return (
    <section className="px-10 py-20 xl:px-20 2xl:px-0">
      <div className="container mx-auto space-y-10">
        <div className="flex">
          <div className="flex size-40 items-center justify-center rounded-full bg-[#FFFAEB]">
            <RevisionBee width={65} />
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-bold">🐝 About Us - RevisionBee</h3>
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
              🎥 Topic explanation videos and strategy breakdowns to help you
              master even the trickiest concepts step-by-step
            </li>
          </ul>

          <h4 className="text-xl font-semibold mt-8 mb-2">
            🐝 Track Your Progress
          </h4>
          <p className="mb-5">
            As you complete quizzes and challenges, RevisionBee keeps track of
            your scores, completed topics, and improvement over time.
          </p>

          <h4 className="text-xl font-semibold mt-8 mb-2">
            🐝 Three Difficulty Levels
          </h4>
          <p className="mb-4">
            Every learner in our hive works at their own pace — that&apos;s why
            RevisionBee offers questions across three clear difficulty levels,
            each marked with a friendly bee-themed badge:
          </p>
          <ul className="pl-6 mb-5 space-y-2">
            <li>
              🟢 <strong>🐝 BuzzEasy (Easy)</strong> — Great for quick warm-ups,
              building confidence, and reinforcing core skills.
            </li>
            <li>
              🟡 <strong>🐝 HoneyChallenge (Intermediate)</strong> — A good
              challenge with multi-step problems and questions designed to
              deepen understanding.
            </li>
            <li>
              🔴 <strong>🐝 HiveMaster (Advanced)</strong> — Demanding questions
              for those ready to test themselves with complex reasoning and
              problem-solving.
            </li>
          </ul>

          <h4 className="text-xl font-semibold mt-8 mb-2">
            🎥 Coming Soon: Video Tutorials
          </h4>
          <p className="mb-5">
            We know some topics need a little extra explanation — so we&apos;re
            creating exclusive RevisionBee video tutorials for select topics.
            These videos will walk you through key strategies, worked examples,
            and revision tips to give you that extra boost before your exams.
          </p>
          <p>
            Join our buzzing community today and take your IB Math revision to
            the next level. 🐝✨
            <br />
            <strong>RevisionBee — Smart Math. Sweet Success.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
