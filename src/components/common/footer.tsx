import Link from "next/link";

import { Facebook, Instagram, RevisionBee, TikTok, YouTube } from "@/lib/icons";

import { paths } from "@/routes";

interface FooterProps {
  variant?: "compact" | "extended";
}

export function Footer({ variant = "compact" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="foot_bg bg-[#126DC2] bg-cover bg-no-repeat px-10 py-10 bg-blend-multiply xl:px-0">
      <div className="container mx-auto">
        {variant === "extended" ? (
          <div className="grid grid-cols-4 gap-5">
            <div className="col-span-4 md:col-span-2">
              <div className="mb-5">
                <RevisionBee />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-white">
                About Revision Bee
              </h3>
              <p className="leading-normal font-normal text-white">
                Quisque fermentum arcu dolor, vitae pharetra arcu efficitur in.
                Nulla sed dui in tortor suscipit pulvinar. In rhoncus, orci
                blandit tincidunt.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <p className="text-white">Follow Us :-</p>
                <div className="spc_itms flex gap-2">
                  <div className="items">
                    <Facebook color="#53A2EB" />
                  </div>
                  <div className="items">
                    <Instagram color="#53A2EB" />
                  </div>
                  <div className="items">
                    <TikTok color="#53A2EB" />
                  </div>
                  <div className="items">
                    <YouTube color="#53A2EB" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4 md:col-span-1">
              <div className="mx-auto w-full md:w-8/12">
                <h3 className="mb-5 text-2xl font-bold text-white">
                  Main Menu
                </h3>
                <ul>
                  <li className="mb-5 text-lg font-normal text-white">
                    <Link href={paths.progress()}>Progress</Link>
                  </li>
                  <li className="mb-5 text-lg font-normal text-white">
                    <Link href={paths.subjects()}>Subjects</Link>
                  </li>
                  <li className="mb-5 text-lg font-normal text-white">
                    <Link href={paths.quiz()}>Quiz</Link>
                  </li>
                  <li className="mb-5 text-lg font-normal text-white">
                    <Link href={paths.accounts.myProfile.scroll()}>
                      My Account
                    </Link>
                  </li>
                  <li className="mb-5 text-lg font-normal text-white">
                    <Link href={paths.home.testimonials()}>Testimonials</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-4 md:col-span-1">
              <div className="ms-auto w-full md:w-8/12">
                <h3 className="mb-5 text-2xl font-bold text-white">Support</h3>
                <ul>
                  <li className="mb-5 text-lg font-normal text-white">
                    <Link href={paths.aboutUs()}>About Us</Link>
                  </li>
                  <li className="mb-5 text-lg font-normal text-white">
                    <Link href={paths.privacyPolicy()}>Privacy Policy</Link>
                  </li>
                  <li className="mb-5 text-lg font-normal text-white">
                    <Link href={paths.termsAndConditions()}>
                      Terms & Conditions
                    </Link>
                  </li>
                  <li className="mb-5 text-lg font-normal text-white">
                    <Link href={paths.faq()}>FAQ</Link>
                  </li>
                  <li className="mb-5 text-lg font-normal text-white">
                    <Link href={paths.home.support()}>Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-4 md:col-span-4">
              <div className="border-t border-[#5D98CF]">
                <p className="mt-8 text-center text-sm font-light text-white md:text-lg">
                  © {currentYear} Revision Bee All rights reserved
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-center text-sm font-light text-white md:text-lg">
              © {currentYear} Revision Bee All rights reserved
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
