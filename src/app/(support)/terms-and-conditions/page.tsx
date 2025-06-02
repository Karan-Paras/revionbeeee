import { BreadcrumbBanner } from "@/components/common/breadcrumb-banner";
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
      <section className="py-10">
        <div className="container mx-auto">
          <div className="rw mb-8">
            <h3 className="font-bold text-2xl mb-2">AGREEMENT TO TERMS</h3>
            <p className="mb-5">
              These Terms and Conditions constitute a legally binding agreement
              made between you, whether personally or on behalf of an entity
              (“you”) and [business entity name] (“we,” “us” or “our”),
              concerning your access to and use of the [website name.com]
              website as well as any other media form, media channel, mobile
              website or mobile application related, linked, or otherwise
              connected thereto (collectively, the “Site”).
            </p>
            <p className="mb-5">
              You agree that by accessing the Site, you have read, understood,
              and agree to be bound by all of these Terms and Conditions. If you
              do not agree with all of these Terms and Conditions, then you are
              expressly prohibited from using the Site and you must discontinue
              use immediately.
            </p>
            <p className="mb-5">
              Supplemental terms and conditions or documents that may be posted
              on the Site from time to time are hereby expressly incorporated
              herein by reference. We reserve the right, in our sole discretion,
              to make changes or modifications to these Terms and Conditions at
              any time and for any reason.
            </p>
            <p className="mb-5">
              Supplemental terms and conditions or documents that may be posted
              on the Site from time to time are hereby expressly incorporated
              herein by reference. We reserve the right, in our sole discretion,
              to make changes or modifications to these Terms and Conditions at
              any time and for any reason.
            </p>
            <p className="mb-5">
              We will alert you about any changes by updating the “Last updated”
              date of these Terms and Conditions, and you waive any right to
              receive specific notice of each such change.
            </p>
            <p className="mb-5">
              It is your responsibility to periodically review these Terms and
              Conditions to stay informed of updates. You will be subject to,
              and will be deemed to have been made aware of and to have
              accepted, the changes in any revised Terms and Conditions by your
              continued use of the Site after the date such revised Terms and
              Conditions are posted.
            </p>
            <p className="mb-5">
              The information provided on the Site is not intended for
              distribution to or use by any person or entity in any jurisdiction
              or country where such distribution or use would be contrary to law
              or regulation or which would subject us to any registration
              requirement within such jurisdiction or country.
            </p>
            <p className="mb-5">
              Accordingly, those persons who choose to access the Site from
              other locations do so on their own initiative and are solely
              responsible for compliance with local laws, if and to the extent
              local laws are applicable.
            </p>
            <p className="mb-5">
              These terms and conditions were created by Termly’s Terms and
              Conditions Generator.
            </p>
          </div>
          <div className="rw mb-8">
            <h3 className="font-bold text-2xl mb-2">
              INTELLECTUAL PROPERTY RIGHTS
            </h3>
            <p className="mb-5">
              Unless otherwise indicated, the Site is our proprietary property
              and all source code, databases, functionality, software, website
              designs, audio, video, text, photographs, and graphics on the Site
              (collectively, the “Content”) and the trademarks, service marks,
              and logos contained therein (the “Marks”) are owned or controlled
              by us or licensed to us, and are protected by copyright and
              trademark laws and various other intellectual property rights and
              unfair competition laws of the United States, foreign
              jurisdictions, and international conventions.
            </p>
            <p className="mb-5">
              The Content and the Marks are provided on the Site “AS IS” for
              your information and personal use only. Except as expressly
              provided in these Terms and Conditions, no part of the Site and no
              Content or Marks may be copied, reproduced, aggregated,
              republished, uploaded, posted, publicly displayed, encoded,
              translated, transmitted, distributed, sold, licensed, or otherwise
              exploited for any commercial purpose whatsoever, without our
              express prior written permission.
            </p>
            <p className="mb-5">
              Provided that you are eligible to use the Site, you are granted a
              limited license to access and use the Site and to download or
              print a copy of any portion of the Content to which you have
              properly gained access solely for your personal, non-commercial
              use. We reserve all rights not expressly granted to you in and to
              the Site, the Content and the Marks.
            </p>
          </div>
          <div className="rw mb-8">
            <h3 className="font-bold text-2xl mb-2">USER REGISTRATION</h3>
            <p>
              You may be required to register with the Site. You agree to keep
              your password confidential and will be responsible for all use of
              your account and password. We reserve the right to remove,
              reclaim, or change a username you select if we determine, in our
              sole discretion, that such username is inappropriate, obscene, or
              otherwise objectionable.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
