import Link from "next/link";

import { Facebook, Instagram, RevisionBee, TikTok, YouTube } from "@/lib/icons";

import { paths } from "@/routes";

interface FooterProps {
  variant?: "compact" | "extended";
}

export function Footer({ variant = "compact" }: FooterProps) {
  return (
    <footer className="bg-[#126DC2] foot_bg bg-no-repeat bg-blend-multiply bg-cover py-10 xl:px-0 px-10">
      <div className="container mx-auto">
        {variant === "extended" ? (
          <div className="grid-cols-4 grid gap-5">
            <div className="col-span-4 md:col-span-2">
              <div className="mb-5">
                <RevisionBee />
              </div>
              <h3 className="font-bold text-white text-2xl mb-3">
                About Revision Bee
              </h3>
              <p className="text-white leading-normal font-normal">
                Quisque fermentum arcu dolor, vitae pharetra arcu efficitur in.
                Nulla sed dui in tortor suscipit pulvinar. In rhoncus, orci
                blandit tincidunt.
              </p>
              <div className="flex gap-2 mt-3 items-center">
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
              <div className="md:w-8/12 w-full mx-auto">
                <h3 className="text-2xl font-bold text-white mb-5">
                  Main Menu
                </h3>
                <ul>
                  <li className="text-lg font-normal text-white mb-5">
                    About Us
                  </li>
                  <li className="text-lg font-normal text-white mb-5">
                    Topics
                  </li>
                  <li className="text-lg font-normal text-white mb-5">
                    Questions
                  </li>
                  <li className="text-lg font-normal text-white mb-5">
                    My Account
                  </li>
                  <li className="text-lg font-normal text-white mb-5">
                    Testimonials
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-4 md:col-span-1">
              <div className="md:w-8/12 w-full ms-auto">
                <h3 className="text-2xl font-bold text-white mb-5">Support</h3>
                <ul>
                  <li className="text-lg font-normal text-white mb-5">
                    <Link href={paths.privacyPolicy()}> Privacy Policy</Link>
                  </li>
                  <li className="text-lg font-normal text-white mb-5">
                    <Link href={paths.termsAndConditions()}>
                      Terms & Conditions
                    </Link>
                  </li>
                  <li className="text-lg font-normal text-white mb-5">
                    <Link href={paths.faq()}>FAQ</Link>
                  </li>
                  <li className="text-lg font-normal text-white mb-5">
                    <Link href={"#contact"}>Contact</Link>
                  </li>
                  <li className="text-lg font-normal text-white mb-5">
                    <Link href={"#contact"}>Help</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-4 md:col-span-4">
              <div className="border-t border-[#5D98CF]">
                <p className="text-white text-center mt-8 font-light md:text-lg text-sm">
                  © 2025 Revision Bee All rights reserved
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-white text-center font-light md:text-lg text-sm">
              © 2025 Revision Bee All rights reserved
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
