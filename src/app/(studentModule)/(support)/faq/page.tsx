import { Accordion } from "@/app/(studentModule)/(support)/faq/accordion";
import { Faq, Faq2 } from "@/assets/images";
import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { paths } from "@/routes";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "FAQs - Revision Bee",
  description:
    "Find answers to common questions about using Revision Bee effectively.",
};

const FAQs = [
  {
    id: 1,
    title: "What is RevisionBee?",
    content: (
      <p>
        RevisionBee is an interactive learning platform designed to help IB Math
        students master exam-style questions through <strong>quizzes</strong>, a
        full <strong>question bank</strong>, <strong>video explanations</strong>
        , and <strong>video solutions with smart hints</strong>.
      </p>
    ),
  },
  {
    id: 2,
    title: "What's included in the free trial?",
    content: (
      <>
        <p>The 3-day free trial gives you full access to everything:</p>
        <ul>
          <li>
            <span className="emoji">✅</span> Quizzes with progress tracking
          </li>
          <li>
            <span className="emoji">✅</span> Full question bank
          </li>
          <li>
            <span className="emoji">✅</span> Video topic explanations
          </li>
          <li>
            <span className="emoji">✅</span> Video solutions with hints
          </li>
        </ul>
        <p>
          After 3 days, you&apos;ll need to subscribe to continue accessing
          content.
        </p>
      </>
    ),
  },
  {
    id: 3,
    title: "How is the platform different from others?",
    content: (
      <>
        <p>We focus purely on IB Math and combine:</p>
        <ul>
          <li>• Real-time feedback on quizzes</li>
          <li>• Detailed video solutions with strategic hints</li>
          <li>• Structured topic coverage</li>
          <li>• Video topic explanation</li>
        </ul>
      </>
    ),
  },
  {
    id: 4,
    title: "Who is this platform for?",
    content: (
      <>
        <p>
          Primarily for IB Math AA SL/HL students and teachers, but also useful
          for:
        </p>
        <ul>
          <li>• IGCSE & MYP students</li>
          <li>• SAT & math competition students</li>
          <li>• Independent learners who want to improve problem-solving</li>
        </ul>
      </>
    ),
  },
  {
    id: 5,
    title: "Can I track my progress?",
    content: (
      <p>
        Yes! Every quiz you take is tracked so you can monitor your progress by
        topic and see where you need improvement.
      </p>
    ),
  },
  {
    id: 6,
    title: "How often is new content added?",
    content: (
      <p>
        New questions and videos are added weekly, especially during IB exam
        seasons.
      </p>
    ),
  },
  {
    id: 7,
    title: "Do you offer support if I'm stuck on a question?",
    content: (
      <p>
        Yes! Many questions come with hints and step-by-step video solutions.
        We&apos;re also working on a student community section where you can ask
        for help.
      </p>
    ),
  },
  {
    id: 8,
    title: "What are the subscription options?",
    content: (
      <>
        <p>We offer:</p>
        <ul>
          <li>
            <span className="emoji">🐝</span> <strong>Free Trial</strong> - 3
            days full access
          </li>
          <li>
            <span className="emoji">🐝</span> <strong>Monthly Plan</strong> -
            $19/month
          </li>
          <li>
            <span className="emoji">🐝</span> <strong>Yearly Plan</strong> -
            $99/year
          </li>
        </ul>
        <p>All plans include the same features.</p>
      </>
    ),
  },
  {
    id: 9,
    title: "Can I cancel my subscription anytime?",
    content: (
      <p>
        Yes, you can cancel anytime. You&apos;ll still have access until the end
        of your billing period.
      </p>
    ),
  },
  {
    id: 10,
    title: "Can teachers use this with their students?",
    content: (
      <p>
        Absolutely! Teachers can use our quiz tracking features to assign tasks
        and monitor student progress. More teacher tools are coming soon.
      </p>
    ),
  },
];

export default function FaqPage() {
  return (
    <>
      <BreadcrumbBanner
        title="FAQ"
        breadcrumbs={[
          {
            label: "Home",
            href: paths.home(),
          },
          {
            label: "FAQ",
            href: paths.faq(),
          },
        ]}
      />
      <section className="bg-[#F6F6F6] px-10 py-20 xl:px-20 2xl:px-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-7">
            <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 col-span-3">
              <div className="itm flex items-center gap-1.5 uppercase">
                <p className="text-[#53A2EB]">Questions Related To</p>
              </div>
              <div className="hed mb-8">
                <h3 className="text-3xl 2xl:leading-20 leading-normal font-bold">
                  Answer you need to know
                </h3>
              </div>
              <Accordion FAQs={FAQs.slice(0, FAQs.length / 2)} />
            </div>
            <div className="2xl:col-span-1 xl:col-span-1 lg:col-span-1 col-span-3">
              <div className="img overflow-hidden rounded-xl border-4 border-white shadow-xl/5">
                <Image src={Faq} alt="Faq" />
              </div>
            </div>
            <div className="2xl:col-span-1 xl:col-span-1 lg:col-span-1 col-span-3">
              <div className="img overflow-hidden rounded-xl border-4 border-white shadow-xl/5">
                <Image src={Faq2} alt="Faq2" />
              </div>
            </div>
            <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 col-span-3">
              <div className="itm flex items-center gap-1.5 uppercase">
                <p className="text-[#53A2EB]">Ask questions</p>
              </div>
              <div className="hed mb-8">
                <h3 className="text-3xl 2xl:leading-20 leading-normal font-bold">
                  How Can We Help You?
                </h3>
              </div>
              <Accordion
                FAQs={FAQs.slice((FAQs.length + 1) / 2, FAQs.length)}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
