"use client";

import { UpgradeSubscriptionModal } from "@/components/modals/upgrade-subscription";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Subscriptions() {
  const [showUpgradeSubscriptionModal, setUpgradeSubscriptionModal] =
    useState(false);

  return (
    <>
      {showUpgradeSubscriptionModal && (
        <UpgradeSubscriptionModal
          onClose={() => setUpgradeSubscriptionModal(false)}
        />
      )}
      <div className="subs bg-white px-7 py-8 rounded-xl">
        <h3 className="text-[#505050] font-bold border-b text-2xl pb-3 border-[#D9D9D9]">
          Subscription{" "}
        </h3>
        <div className="frm py-5">
          <div className=" border border-[#D5D5D5] rounded-2xl max-w-lg w-10/12 mx-auto">
            <div className="grid grid-cols-5  items-center">
              <div className="col-span-3 px-6 py-8">
                <h3 className="font-bold text-2xl mb-2">Starter Plan</h3>
                <p>Best plans for the students</p>
              </div>
              <div className="col-span-2 px-6 py-8">
                <p>Expire on</p>
                <h6 className="text-[#FB4F1B] font-bold text-lg">12-5 -2025</h6>
              </div>
              <div className="col-span-5 px-6 py-5 border-t border-[#D9D9D9]">
                <div className="flex gap-2 items-center">
                  <h3 className="text-2xl font-bold">130 USD</h3>
                  <span className="text-[#9D9D9D]">Per month</span>
                </div>
              </div>
            </div>
            <div className="col-span-5">
              {[
                "Unlock 10 questions",
                "Real time suggest answers",
                "Providing helping tips",
                "Cover 10 topics in a day",
              ].map((content) => (
                <div key={content} className="itm flex gap-4 px-6 mb-5  ">
                  <div className="icn">
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
                      <path
                        d="M1.46423 13.9418L3.04564 15.3619C3.20817 15.5078 3.30607 15.7124 3.31779 15.9305L3.38766 17.2305C3.49085 19.1507 5.13114 20.6237 7.05138 20.5205L8.35138 20.4506C8.56951 20.4389 8.78332 20.5143 8.94585 20.6603L9.91449 21.5301C11.3453 22.8149 13.5467 22.6966 14.8315 21.2659L15.7014 20.2972C15.8473 20.1347 16.0518 20.0368 16.27 20.0251L17.57 19.9552C19.4902 19.852 20.9632 18.2118 20.86 16.2915L20.7901 14.9915C20.7784 14.7734 20.8538 14.5595 20.9998 14.397L21.8696 13.4284C23.1544 11.9976 23.0361 9.79618 21.6053 8.51134L20.6367 7.64153C20.4742 7.49558 20.3763 7.29106 20.3646 7.07293L20.2947 5.77292C20.1915 3.85268 18.5512 2.37971 16.631 2.4829L15.331 2.55277C15.1129 2.56449 14.899 2.48907 14.7365 2.34312L13.7679 1.47331C12.3371 0.188474 10.1357 0.306782 8.85081 1.73756L7.98097 2.70617C7.83502 2.8687 7.63053 2.9666 7.4124 2.97832L6.11243 3.04818C4.19219 3.15138 2.71918 4.7917 2.82238 6.71194L2.89224 8.01191C2.90396 8.23004 2.82855 8.44388 2.6826 8.60641L1.26249 10.1878C0.281566 11.2802 0.371889 12.9609 1.46423 13.9418Z"
                        fill="#FFCC00"
                      />
                      <path
                        d="M16.8677 7.85418C16.9144 7.81625 16.9842 7.82333 17.022 7.8698L17.1958 8.08367L17.1978 8.0866L17.5718 8.54753L17.5737 8.54949L17.7476 8.76433C17.7853 8.8108 17.7786 8.87973 17.732 8.91765C14.9725 11.159 12.7326 12.9791 9.97316 15.2204C9.92649 15.2579 9.85768 15.2503 9.81984 15.2038L9.64602 14.9899L9.64406 14.987L9.26906 14.5261L9.26711 14.5241L9.09328 14.3093L9.09133 14.3053C7.79245 12.7062 8.31367 13.3478 6.36672 10.9509C6.32884 10.9042 6.336 10.8353 6.38234 10.7975L6.59719 10.6227L6.59914 10.6218L7.06008 10.2468L7.06203 10.2448L7.27687 10.071C7.3233 10.0333 7.39225 10.04 7.43019 10.0866C9.34334 12.442 8.87322 11.8639 10.0884 13.36C12.4172 11.4684 14.4419 9.82446 16.8677 7.85418Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="desc">
                    <p>{content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-5">
              <div className="btn px-6 py-3 mb-4">
                <Button
                  type="button"
                  onClick={() => setUpgradeSubscriptionModal(true)}
                >
                  Upgrade Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
