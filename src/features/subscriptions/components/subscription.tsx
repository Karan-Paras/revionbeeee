"use client";

import { Button } from "@/components/ui/button";
import { useCheckout } from "@/features/subscriptions/queries/use-checkout";
import {
  type Plan,
  type SubscriptionVariants,
  SubscriptionType,
} from "@/features/subscriptions/types";
import { useGetProfile } from "@/features/user/queries/use-get-profile";
import { BadgeCheck } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { paths } from "@/routes";
import { addDays, differenceInCalendarDays, isFuture } from "date-fns";
import { getSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";

interface SubscriptionProps {
  plan: Plan;
  href?: string;
  variant?: SubscriptionVariants;
  activePlan?: SubscriptionType;
  callback?: string;
  display?: boolean;
}

export function Subscription({
  plan,
  href = "#",
  variant = "detailed",
  activePlan,
  callback,
  display,
}: SubscriptionProps) {
  const router = useRouter();

  const mutation = useCheckout();

  const pathname = usePathname();

  const { title, type, description, price, period = "", features } = plan;

  const { data: profile, isPending } = useGetProfile();

  const isCurrent = activePlan === type;

  const periodText = () => {
    if (type === SubscriptionType.FREE) {
      if (display) {
        return "3 days free trial";
      }
      if (isPending) return <Skeleton width={100} />;
      const createdAt = profile?.data.created_at;

      if (!createdAt) return "Expired";

      const createdDate = new Date(createdAt);
      // the free plan lasts for 3 days from the creation date
      const expiryDate = addDays(createdDate, 3);

      const now = new Date();
      if (!isFuture(expiryDate)) return "Expired";

      const remainingDays = differenceInCalendarDays(expiryDate, now);
      return `${remainingDays} day${remainingDays > 1 ? "s" : ""} left`;
    }

    return period;
  };

  async function handleCheckout() {
    if (display) {
      return;
    }

    const session = await getSession();

    if (!session) {
      router.push(paths.login());
    }

    const callbackUrl = callback || pathname;

    switch (type) {
      case SubscriptionType.MONTHLY:
        mutation.mutate({
          plan: "monthly",
          callback: callbackUrl,
        });
        break;
      case SubscriptionType.YEARLY:
        mutation.mutate({
          plan: "yearly",
          callback: callbackUrl,
        });
        break;
      case SubscriptionType.FREE:
        router.push(href);
        break;
      default:
        break;
    }
  }

  if (variant === "detailed") {
    return (
      <div className="col-span-3 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
        <div className="crd relative rounded-3xl border border-[#D5D5D5] bg-white shadow-lg xl:min-h-auto lg:min-h-[490px]">
          {type === SubscriptionType.YEARLY && (
            <div className="absolute -top-6 right-3 rounded-2xl border-4 border-white bg-[#ffefc6] px-4 py-3 text-center text-sm font-semibold text-[#765708] opacity-100">
              {" "}
              Best Value
            </div>
          )}
          <div className="upr border-b border-[#D5D5D5] p-6">
            <h3 className="pb-3.5 text-2xl font-semibold text-black">
              {title}&nbsp;
              {type === SubscriptionType.FREE && (
                <span className="font-normal text-[#9D9D9D] text-sm">
                  (Trial - 3 Days Only)
                </span>
              )}
            </h3>
            <p className="2xl:text-base xl:text-sm  text-sm">{description}</p>
          </div>
          <div className="lwr p-6">
            <div className="flex items-center gap-2.5">
              <h4 className="text-3xl font-bold text-black">{price}</h4>
              <span className="font-normal text-[#9D9D9D]">{periodText()}</span>
            </div>
            <div className="lst my-8">
              <ul>
                {features.map((feature, index) => (
                  <li key={index} className="my-5 flex items-center gap-1.5">
                    <span>
                      <BadgeCheck color="#FFCC00" />
                    </span>
                    <p className="text-[#505050] 2xl:text-base xl:text-sm text-sm">
                      {feature}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            {!display && (
              <div className="btn mt-14">
                <Button
                  onClick={handleCheckout}
                  disabled={mutation.isPending}
                  variant="rounded"
                >
                  Choose This Plan
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="col-span-1">
        <div
          className={cn(
            "crd rounded-xl border border-[#DADADA] px-6 py-7 lg:min-h-[490px]",
            isCurrent && "relative"
          )}
        >
          {isCurrent && (
            <div className="absolute -top-6 right-3 rounded-2xl border-4 border-white bg-[#FFE7E4] px-4 py-3 text-center text-sm font-semibold text-[#F15642] opacity-100">
              Current Plan
            </div>
          )}
          <div className={cn(isCurrent && "opacity-40")}>
            <div className="mb-4 border-b border-[#DADADA] pb-4 lg:min-h-[100px]">
              <h3 className="mb-2 text-2xl font-bold">
                {title}&nbsp;
                {type === SubscriptionType.FREE && (
                  <span className="font-normal text-[#9D9D9D] text-sm">
                    (Trial - 3 Days Only)
                  </span>
                )}
              </h3>
              <p className="text-sm font-light 2xl:text-base xl:text-sm ">
                {description}
              </p>
            </div>
            <div className="my-6 flex items-center gap-2">
              <h2 className="text-3xl font-bold text-[#53A2EB]">{price}</h2>
              <p className="text-[#9D9D9D]">{periodText()}</p>
            </div>
            {features.slice(0, 4).map((feature, index) => (
              <div className="lst mb-5 flex gap-2" key={index}>
                <span>
                  <BadgeCheck width={23} height={23} color="#FFCC00" />
                </span>
                <p className="text-[#505050] 2xl:text-base xl:text-sm text-sm">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
        {!isCurrent && !display && (
          <Button
            className="mt-4"
            variant="rounded"
            onClick={handleCheckout}
            disabled={mutation.isPending}
          >
            Upgrade Plan
          </Button>
        )}
      </div>
    );
  }
}
