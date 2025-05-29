"use client";

import { CurrentPlan } from "@/features/subscriptions/components/current-plan";

export default function Subscriptions() {
  return (
    <div className="subs bg-white px-7 py-8 rounded-xl">
      <h3 className="text-[#505050] font-bold border-b text-2xl pb-3 border-[#D9D9D9]">
        Subscription
      </h3>
      <CurrentPlan />
    </div>
  );
}
