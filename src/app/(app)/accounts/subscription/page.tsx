"use client";

import { CurrentPlan } from "@/features/subscriptions/components/current-plan";

export default function Subscriptions() {
  return (
    <div className="subs rounded-xl bg-white px-7 py-8">
      <h3 className="border-b border-[#D9D9D9] pb-3 text-2xl font-bold text-[#505050]">
        Subscription
      </h3>
      <CurrentPlan />
    </div>
  );
}
