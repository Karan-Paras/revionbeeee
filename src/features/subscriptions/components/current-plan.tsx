import { useState } from "react";

import { Button } from "@/components/ui/button";
import { UpgradeSubscriptionModal } from "@/features/subscriptions/components/upgrade-subscription-modal";

import { BadgeCheck } from "@/lib/icons";

import { STARTER_PLAN } from "@/features/subscriptions/types";

export function CurrentPlan() {
  const [showUpgradeSubscriptionModal, setShowUpgradeSubscriptionModal] =
    useState(false);

  const CURRENT_PLAN = STARTER_PLAN;

  const { title, description, price, period, features } = CURRENT_PLAN;

  return (
    <>
      {showUpgradeSubscriptionModal && (
        <UpgradeSubscriptionModal
          onClose={() => setShowUpgradeSubscriptionModal(false)}
        />
      )}
      <div className="frm py-5">
        <div className=" border border-[#D5D5D5] rounded-2xl max-w-lg w-10/12 mx-auto">
          <div className="grid grid-cols-5  items-center">
            <div className="col-span-3 px-6 py-8">
              <h3 className="font-bold text-2xl mb-2">{title}</h3>
              <p>{description}</p>
            </div>
            <div className="col-span-2 px-6 py-8">
              <p>Expire on</p>
              <h6 className="text-[#FB4F1B] font-bold text-lg">12-5 -2025</h6>
            </div>
            <div className="col-span-5 px-6 py-5 border-t border-[#D9D9D9]">
              <div className="flex gap-2 items-center">
                <h3 className="text-2xl font-bold">{price}</h3>
                <span className="text-[#9D9D9D]">{period}</span>
              </div>
            </div>
          </div>
          <div className="col-span-5">
            {features.map((content) => (
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
                onClick={() => setShowUpgradeSubscriptionModal(true)}
              >
                Upgrade Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
