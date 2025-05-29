"use client";

import { UpgradeSubscriptionModal } from "@/components/modals/upgrade-subscription";
import { Button } from "@/components/ui/button";
import { BadgeCheck } from "@/lib/icons";
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
          Subscription
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
                    <BadgeCheck width={23} height={23} color="#FFCC00" />
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
