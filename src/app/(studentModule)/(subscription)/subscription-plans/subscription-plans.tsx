"use client";

import { SubscriptionPlans as SubscriptionPlansComponent } from "@/features/subscriptions/components/subscription-plans";
import {
  isFreeTrialActive,
  isUserSubscribed,
} from "@/features/subscriptions/utils";
import { useGetProfile } from "@/features/user/queries/use-get-profile";
import { paths } from "@/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function SubscriptionPlans() {
  const router = useRouter();

  const { data, isLoading, isPending } = useGetProfile();

  const isProfileLoading = isLoading || isPending;
  const isSubscribed = isUserSubscribed(data?.data.isSubscribed);
  const hasFreeTrialAccess = isFreeTrialActive(data?.data.created_at);
  const showFreePlan = isFreeTrialActive(data?.data.created_at);

  useEffect(() => {
    if (data && (isSubscribed || hasFreeTrialAccess)) {
      router.replace(paths.dashboard());
    }
  }, [data, hasFreeTrialAccess, isSubscribed, router]);

  if (isProfileLoading || isSubscribed || hasFreeTrialAccess) {
    return null;
  }

  return (
    <section className="mths_bg bg-cover bg-no-repeat p-5 md:min-h-screen 2xl:h-screen">
      <div className="container mx-auto h-full">
        <div className="grid h-full grid-cols-3 content-center gap-8">
          <div className="col-span-3">
            <div className="hed relative my-3.5 mb-10 text-center">
              <h1 className="mb-2 text-center text-3xl font-bold text-[#000000]">
                Subscription Plans
              </h1>
              <p className="text-sm text-[#505050]">
                Select a subscription plan that best suits your needs.
              </p>
            </div>
          </div>
          <SubscriptionPlansComponent
            href={paths.dashboard()}
            callback={paths.dashboard()}
            showFreePlan={showFreePlan}
          />
        </div>
      </div>
    </section>
  );
}
