import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
import { EMAIL } from "@/features/support/types";
import { paths } from "@/routes";

export default function TermsAndConditions() {
  return (
    <>
      <BreadcrumbBanner
        title="Terms & Conditions"
        breadcrumbs={[
          {
            label: "Home",
            href: paths.home(),
          },
          {
            label: "Terms & Conditions",
            href: paths.termsAndConditions(),
          },
        ]}
      />
      <section className="px-10 py-20 xl:px-20 2xl:px-0">
        <div className="container mx-auto space-y-8">
          <p className="text-sm text-gray-500">Effective Date: July 1, 2025</p>

          <div>
            <h3 className="mb-2 text-2xl font-bold">1. Acceptance of Terms</h3>
            <p>
              By accessing or using RevisionBee, you agree to be bound by these
              Terms and Conditions and our Privacy Policy. If you do not agree
              to any part of these terms, you must not use the platform.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-2xl font-bold">2. User Accounts</h3>
            <p>
              To access certain features, you must register for an account. You
              are responsible for safeguarding your login credentials and all
              activities that occur under your account. Sharing your account
              details with others is strictly prohibited.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-2xl font-bold">
              3. Subscription and Payment
            </h3>
            <p>
              <strong>Free Trial:</strong> RevisionBee offers a 3-day free trial
              with full access to all features.
            </p>
            <p>
              <strong>Paid Plans:</strong> After the trial ends, continued use
              requires a paid subscription (monthly or yearly).
            </p>
            <p>
              <strong>Billing:</strong> Subscriptions are billed in advance. All
              payments are non-refundable.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-2xl font-bold">4. Use of Content</h3>
            <p>
              All content on RevisionBee, including quizzes, question banks,
              video explanations, and video solutions, is the intellectual
              property of the platform. The materials are provided for personal,
              non-commercial use only. Reproduction, distribution, or resale of
              any content without permission is strictly prohibited.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-2xl font-bold">5. Cancellation Policy</h3>
            <p>
              You may cancel your subscription at any time through your account
              settings. You will retain access until the end of your current
              billing period. No refunds will be provided for partial usage
              periods.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-2xl font-bold">6. Code of Conduct</h3>
            <p>
              Users are expected to behave respectfully on the platform. Any
              attempt to misuse, hack, share unauthorized content, or violate
              academic integrity may result in account suspension or permanent
              termination.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-2xl font-bold">
              7. Modifications to the Service
            </h3>
            <p>
              We reserve the right to modify or discontinue any part of the
              platform, including features, pricing, or content, at any time.
              Updates will be communicated on the site or via email when
              necessary.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-2xl font-bold">
              8. Limitation of Liability
            </h3>
            <p>
              RevisionBee is not liable for any indirect, incidental, or
              consequential damages resulting from your use of the platform. All
              services and materials are provided “as is” without warranties of
              any kind.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-2xl font-bold">9. Contact</h3>
            <p>
              If you have questions about these terms, please contact us at:
              <br />
              📧&nbsp;
              {EMAIL}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
