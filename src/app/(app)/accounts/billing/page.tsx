"use client";

import { DataLoader } from "@/components/loaders/data-loader";
import { Billing } from "@/features/subscriptions/components/billing";
import { CurrentPlan } from "@/features/subscriptions/components/current-plan";
import { useGetProfile } from "@/features/user/queries/use-get-profile";
import { paths } from "@/routes";

export default function BillingPage() {
  const { data, isPending } = useGetProfile();

  return (
    <div
      id={paths.accounts.billing.scroll().split("#")[1]}
      className="subs rounded-xl bg-white px-7 py-8"
    >
      <h3 className="border-b border-[#D9D9D9] pb-3 text-2xl font-bold text-[#505050]">
        Billing
      </h3>
      {(() => {
        if (isPending) {
          return <DataLoader />;
        }

        if (data) {
          const user = data.data;

          if (!user.customerID) {
            return (
              <>
                <h4 className="text-lg font-semibold text-[#505050] text-center mt-10">
                  To access billing details, you need to purchase a
                  subscription.
                </h4>
                <CurrentPlan />
              </>
            );
          }

          return <Billing />;
        }
      })()}
    </div>
  );
}
