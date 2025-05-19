import { RevisionBee } from "@/lib/icons";
import Link from "next/link";

interface FooterProps {
  variant?: "compact" | "extended";
}

export function Footer({ variant = "compact" }: FooterProps) {
  return (
    <footer className="bg-[#126DC2] foot_bg bg-no-repeat bg-blend-multiply bg-cover py-10">
      <div className="container mx-auto">
        {variant === "extended" ? (
          <div className="grid-cols-4 grid gap-5">
            <div className="col-span-2">
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
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.62 29.6199C22.6944 29.6199 29.24 23.0743 29.24 14.9999C29.24 6.92548 22.6944 0.379883 14.62 0.379883C6.54561 0.379883 0 6.92548 0 14.9999C0 23.0743 6.54561 29.6199 14.62 29.6199Z"
                        fill="white"
                      />
                      <path
                        d="M17.621 7.00333L15.4624 7C13.0371 7 11.4699 8.54552 11.4699 10.9376V12.7531H9.29939C9.11184 12.7531 8.95996 12.8993 8.95996 13.0795V15.71C8.95996 15.8903 9.11201 16.0363 9.29939 16.0363H11.4699V22.6738C11.4699 22.854 11.6217 23 11.8093 23H14.6411C14.8287 23 14.9806 22.8539 14.9806 22.6738V16.0363H17.5184C17.7059 16.0363 17.8578 15.8903 17.8578 15.71L17.8588 13.0795C17.8588 12.993 17.823 12.9101 17.7594 12.8488C17.6959 12.7876 17.6093 12.7531 17.5192 12.7531H14.9806V11.2141C14.9806 10.4744 15.164 10.0989 16.1665 10.0989L17.6207 10.0984C17.8081 10.0984 17.96 9.95222 17.96 9.77211V7.32958C17.96 7.14964 17.8083 7.00366 17.621 7.00333Z"
                        fill="#53A2EB"
                      />
                    </svg>
                  </div>
                  <div className="items">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.8602 29.6199C22.9346 29.6199 29.4802 23.0743 29.4802 14.9999C29.4802 6.92548 22.9346 0.379883 14.8602 0.379883C6.78584 0.379883 0.240234 6.92548 0.240234 14.9999C0.240234 23.0743 6.78584 29.6199 14.8602 29.6199Z"
                        fill="white"
                      />
                      <path
                        d="M19.4006 9.46973C18.8506 9.46973 18.3906 9.91973 18.3906 10.4697C18.3906 11.0297 18.8406 11.4797 19.4006 11.4797C19.9606 11.4797 20.4106 11.0297 20.4106 10.4697C20.4106 9.91973 19.9606 9.46973 19.4006 9.46973Z"
                        fill="#53A2EB"
                      />
                      <path
                        d="M14.93 10.7598C12.6 10.7598 10.71 12.6498 10.71 14.9798C10.71 17.3098 12.6 19.1998 14.93 19.1998C17.26 19.1998 19.1499 17.3098 19.1499 14.9798C19.1499 12.6598 17.26 10.7598 14.93 10.7598ZM14.93 17.6898C13.44 17.6898 12.2299 16.4798 12.2299 14.9898C12.2299 13.4998 13.44 12.2898 14.93 12.2898C16.42 12.2898 17.6299 13.4998 17.6299 14.9898C17.6399 16.4698 16.42 17.6898 14.93 17.6898Z"
                        fill="#53A2EB"
                      />
                      <path
                        d="M18.28 23.5599H11.44C8.60003 23.5599 6.29004 21.2499 6.29004 18.4099V11.5699C6.29004 8.72992 8.60003 6.41992 11.44 6.41992H18.28C21.12 6.41992 23.4301 8.72992 23.4301 11.5699V18.4099C23.4301 21.2499 21.12 23.5599 18.28 23.5599ZM11.44 8.01992C9.49003 8.01992 7.90002 9.60992 7.90002 11.5599V18.3999C7.90002 20.3499 9.49003 21.9399 11.44 21.9399H18.28C20.23 21.9399 21.82 20.3499 21.82 18.3999V11.5599C21.82 9.60992 20.23 8.01992 18.28 8.01992H11.44Z"
                        fill="#53A2EB"
                      />
                    </svg>
                  </div>
                  <div className="items">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.1 29.6199C23.1744 29.6199 29.72 23.0743 29.72 14.9999C29.72 6.92548 23.1744 0.379883 15.1 0.379883C7.02557 0.379883 0.47998 6.92548 0.47998 14.9999C0.47998 23.0743 7.02557 29.6199 15.1 29.6199Z"
                        fill="white"
                      />
                      <path
                        d="M22.6898 13.3199C22.5398 13.3299 22.3898 13.3399 22.2398 13.3399C20.5898 13.3399 19.0498 12.5099 18.1498 11.1299V18.6499C18.1498 21.7199 15.6598 24.2099 12.5898 24.2099C9.51978 24.2099 7.02979 21.7199 7.02979 18.6499C7.02979 15.5799 9.51978 13.0899 12.5898 13.0899C12.7098 13.0899 12.8198 13.0999 12.9298 13.1099V15.8499C12.8198 15.8399 12.6998 15.8199 12.5898 15.8199C11.0198 15.8199 9.74979 17.0899 9.74979 18.6599C9.74979 20.2299 11.0198 21.4999 12.5898 21.4999C14.1598 21.4999 15.5398 20.2599 15.5398 18.6999L15.5698 5.90991H18.1898C18.4398 8.25991 20.3298 10.0999 22.6898 10.2699V13.3199Z"
                        fill="#53A2EB"
                      />
                    </svg>
                  </div>
                  <div className="items">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.3402 29.6199C23.4146 29.6199 29.9602 23.0743 29.9602 14.9999C29.9602 6.92548 23.4146 0.379883 15.3402 0.379883C7.26582 0.379883 0.720215 6.92548 0.720215 14.9999C0.720215 23.0743 7.26582 29.6199 15.3402 29.6199Z"
                        fill="white"
                      />
                      <path
                        d="M22.9604 12.7607C22.9604 10.6821 21.3905 9 19.4505 9H10.4705C8.53046 9 6.96045 10.6821 6.96045 12.7607V17.2393C6.96045 19.3179 8.53046 21 10.4705 21H19.4505C21.3905 21 22.9604 19.3179 22.9604 17.2393V12.7607ZM17.6805 15.3321L13.6505 17.4643C13.4905 17.5607 12.9604 17.4321 12.9604 17.2393V12.8571C12.9604 12.6643 13.5005 12.5357 13.6605 12.6321L17.5105 14.8821C17.6705 14.9893 17.8405 15.2464 17.6805 15.3321Z"
                        fill="#53A2EB"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="w-8/12 mx-auto">
                <h3 className="text-2xl font-bold text-white mb-5">
                  Main Menu
                </h3>
                <ul>
                  <li className="text-lg font-normal text-white mb-5">
                    About Us
                  </li>
                  <li className="text-lg font-normal text-white mb-5">
                    Topics{" "}
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
            <div className="col-span-1">
              <div className="w-8/12 ms-auto">
                <h3 className="text-2xl font-bold text-white mb-5">Support</h3>
                <ul>
                  <li className="text-lg font-normal text-white mb-5">
                    <Link href="/privacy-policy"> Privacy Policy</Link>
                  </li>
                  <li className="text-lg font-normal text-white mb-5">
                    <Link href="/terms-and-conditions">Terms & Conditions</Link>
                  </li>
                  <li className="text-lg font-normal text-white mb-5">
                    <Link href="/FAQ">FAQ</Link>
                  </li>
                  <li className="text-lg font-normal text-white mb-5">
                    Contact
                  </li>
                  <li className="text-lg font-normal text-white mb-5">Help</li>
                </ul>
              </div>
            </div>
            <div className="col-span-4">
              <div className="border-t border-[#5D98CF]">
                <p className="text-white text-center mt-8 font-light text-lg">
                  © 2025 Revision Bee All rights reserved
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-white text-center font-light text-lg">
              © 2025 Revision Bee All rights reserved
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
