import { EMAIL } from "@/features/support/types";
import Link from "next/link";

export function TermsAndPolicy() {
  return (
    <div className="desc">
      <h4 className="mb-3 text-xl font-bold">AGREEMENT TO TERMS</h4>

      <p className="mb-3 text-base font-normal text-[#505050]">
        Welcome to RevisionBee.com (“Revision Bee”, “we”, “our”, or “us”). By
        accessing or using this website, you agree to be bound by the following
        Terms and Conditions. These terms apply to all users of the Site and
        govern your access to the features, content, and educational tools
        provided by Revision Bee (collectively referred to as the “Site”).
      </p>

      <p className="mb-3 text-base font-normal text-[#505050]">
        Please read these Terms carefully. If you do not agree with any part of
        them, please do not use the Site.
      </p>

      <h5 className="mb-2 mt-4 text-lg font-semibold">
        1. Acceptance of Terms
      </h5>
      <p className="mb-3 text-base font-normal text-[#505050]">
        By continuing to use RevisionBee.com, you confirm that you understand
        and agree to these Terms and Conditions. Your use of the Site
        constitutes a legally binding agreement between you and Revision Bee.
      </p>

      <h5 className="mb-2 mt-4 text-lg font-semibold">
        2. Purpose of the Site
      </h5>
      <p className="mb-3 text-base font-normal text-[#505050]">
        Revision Bee is an open-access educational platform designed to help
        students — especially those preparing for the International
        Baccalaureate (IB) — improve their mathematics skills. We provide
        interactive quizzes, question banks, progress tracking, and video
        explanations of topics to support deeper understanding.
      </p>
      <p className="mb-3 text-base font-normal text-[#505050]">
        All features are openly available to users without hidden restrictions
        or locked content.
      </p>

      <h5 className="mb-2 mt-4 text-lg font-semibold">3. User Conduct</h5>
      <p className="mb-3 text-base font-normal text-[#505050]">
        We ask that you use the Site responsibly and only for educational
        purposes. You agree not to misuse any content or features of the Site,
        interfere with its functionality, or attempt to disrupt the learning
        experience of others.
      </p>

      <h5 className="mb-2 mt-4 text-lg font-semibold">4. Age Requirement</h5>
      <p className="mb-3 text-base font-normal text-[#505050]">
        The platform is designed for students aged 10 and above. If you are
        under 18, you must use the Site with the consent and guidance of a
        parent or guardian.
      </p>

      <h5 className="mb-2 mt-4 text-lg font-semibold">5. Updates to Terms</h5>
      <p className="mb-3 text-base font-normal text-[#505050]">
        We may update these Terms occasionally to reflect changes to the Site or
        our services. When we do, we will revise the “Last Updated” date at the
        top of this page. Continued use of the Site after such changes will be
        considered your acceptance of the revised Terms.
      </p>

      <h5 className="mb-2 mt-4 text-lg font-semibold">6. Contact Us</h5>
      <p className="mb-3 text-base font-normal text-[#505050]">
        If you have any questions about these Terms, or suggestions for
        improving the Site, feel free to reach out:
      </p>
      <p className="mb-3 text-base font-normal text-[#505050]">
        <span className="emoji">📧</span>
        <Link
          href={`mailto:${EMAIL}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {EMAIL}
        </Link>
      </p>
    </div>
  );
}
