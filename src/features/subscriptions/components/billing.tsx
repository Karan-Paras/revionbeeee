"use client";

import { Billing as BillingIcon } from "@/assets/icons";
import { DataLoader } from "@/components/loaders/data-loader";
import { CurrentPlan } from "@/features/subscriptions/components/current-plan";
import { useBilling } from "@/features/subscriptions/queries/use-billing";
import { useGetProfile } from "@/features/user/queries/use-get-profile";
import { paths } from "@/routes";
import { usePathname } from "next/navigation";

export function Billing() {
  const { data, isPending } = useGetProfile();

  const pathname = usePathname();
  const mutation = useBilling();

  const onClick = () => {
    mutation.mutate({
      callback: pathname,
      customerId: data?.data.customerID || "",
    });
  };

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

        if (!data) {
          return;
        }

        const user = data.data;

        if (!user.customerID) {
          return (
            <>
              <h4 className="text-lg font-semibold text-[#505050] text-center mt-10">
                To access billing details, you need to purchase a subscription.
              </h4>
              <CurrentPlan />
            </>
          );
        }

        return (
          <div className="container mx-auto h-full">
            <div className="grid h-full content-center md:p-10 p-5">
              <div className="img flex justify-center">
                <BillingIcon />
              </div>
              <div className="desc my-5 text-center">
                <h3 className="mb-3 text-2xl font-bold text-[#0B0B0B]">
                  Manage Your Subscription
                </h3>
                <p className="text-sm font-light text-[#6C6C6C]">
                  You&apos;ll be redirected to our secure Stripe billing portal
                  to view or cancel your subscription.
                </p>
              </div>
              <div className="btn flex justify-center">
                <button
                  onClick={onClick}
                  disabled={isPending || mutation.isPending}
                  className="md:w-5/12 w-full cursor-pointer rounded-xl bg-[#53A2EB] p-4 font-medium text-white"
                >
                  {isPending
                    ? "Processing..."
                    : mutation.isPending
                      ? "Redirecting..."
                      : "Continue"}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
