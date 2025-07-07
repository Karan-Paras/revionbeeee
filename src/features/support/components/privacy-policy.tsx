import { EMAIL } from "@/features/support/types";
import Link from "next/link";

export function PrivacyPolicy() {
  return (
    <section className="py-10 px-10 xl:px-20 2xl:px-0">
      <div className="container mx-auto">
        <div className="rw mb-8 space-y-8">
          <p>
            At RevisionBee, your privacy is important to us. This policy
            explains what data we collect, how we use it, and what your rights
            are.
          </p>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="rw mb-8">
          <h3 className="mb-2 text-2xl font-bold">
            1. What do we do with your information?
          </h3>
          <div className="space-y-4">
            <p>
              When you create an account or make a payment, we collect basic
              personal information such as your email address, login
              credentials, and (optionally) a profile picture.
            </p>
            <p>We use this information to:</p>
            <ul className="list-disc list-inside ml-4">
              <li>
                Provide access to quizzes, question banks, and video resources
              </li>
              <li>Manage your subscription and payment status</li>
              <li>Ensure the platform functions properly</li>
            </ul>
            <p>
              We do <strong>not</strong> sell or share your information for
              marketing purposes.
            </p>
          </div>
        </div>

        <div className="rw mb-8">
          <h3 className="mb-2 text-2xl font-bold">2. Consent</h3>
          <p>
            By using our website and registering for an account, you consent to
            the collection and use of your information as described in this
            policy. You may withdraw your consent at any time by requesting to
            delete your account.
          </p>
        </div>

        <div className="rw mb-8">
          <h3 className="mb-2 text-2xl font-bold">3. Disclosure</h3>
          <p>
            We will never share your personal information unless legally
            required to do so (e.g., a valid court order).
          </p>
        </div>

        <div className="rw mb-8">
          <h3 className="mb-2 text-2xl font-bold">4. Third-party services</h3>
          <p>
            We use Stripe to securely process payments. When you subscribe to a
            paid plan, your payment details are handled directly by Stripe. We
            do not store your credit card or billing information on our servers.
            Stripe&apos;s use of your data is governed by their own&nbsp;
            <Link
              href="https://stripe.com/in/privacy"
              target="_blank"
              className="text-blue-600 hover:underline"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <div className="rw mb-8">
          <h3 className="mb-2 text-2xl font-bold">5. Security</h3>
          <p>
            We implement standard industry security measures to protect your
            information. Account data is stored securely, and payment processing
            is handled through encrypted and PCI-compliant methods via Stripe.
          </p>
        </div>

        <div className="rw mb-8">
          <h3 className="mb-2 text-2xl font-bold">6. Cookies</h3>
          <div className="space-y-4">
            <p>We use essential cookies to:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Keep you logged in</li>
              <li>Maintain basic session functionality</li>
            </ul>
            <p>
              We do <strong>not</strong> use third-party advertising or tracking
              cookies.
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto ">
        <h3 className="mb-2 text-2xl font-bold">📧 Contact Us</h3>
        <p>
          If you have any questions about this policy or your data, please
          contact:&nbsp;
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
    </section>
  );
}
