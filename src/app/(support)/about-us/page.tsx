import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { RevisionBee } from "@/lib/icons";
import { paths } from "@/routes";

export default function AboutUs() {
  return (
    <>
      <BreadcrumbBanner
        title="About Us"
        breadcrumbs={[
          {
            label: "Home",
            href: paths.home(),
          },
          {
            label: "About Us",
            href: paths.aboutUs(),
          },
        ]}
      />

      <section className="px-10 py-20 xl:px-20 2xl:px-0">
        <div className="container mx-auto space-y-10">
          <div className="flex justify-center">
            <div className="flex size-40 items-center justify-center rounded-full bg-[#FFFAEB]">
              <RevisionBee width={100} />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-2xl font-bold text-center">About Us</h3>
            <p className="mb-5">
              Welcome to Revision Bee, your go-to destination for fun and
              engaging math quizzes designed specifically for students! Our
              mission is to make math exciting, accessible, and rewarding for
              learners of all ages. Whether you&apos;re brushing up on basic
              arithmetic or tackling more advanced topics like algebra and
              geometry, our interactive quizzes are here to support your
              learning journey.
            </p>
            <p className="mb-5">
              At Revision Bee, we believe that learning math doesn&apos;t have
              to be boring. That&apos;s why we&apos;ve created a variety of quiz
              levels, challenges, and game-based formats to keep you motivated
              and entertained while you learn. Each quiz is carefully designed
              to match curriculum standards and help you practice essential
              skills at your own pace.
            </p>
            <p className="mb-5">
              Join thousands of students who are transforming the way they learn
              math. Whether you&apos;re studying for an exam or just love a good
              challenge, Revision Bee is here to make math your new favorite
              subject. Start quizzing today and discover the fun side of math!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
