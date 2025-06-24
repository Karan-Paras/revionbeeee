import Link from "next/link";

import type { Plan } from "@/features/subscriptions/types";

import { BadgeCheck } from "@/lib/icons";

import { cn } from "@/lib/utils";
import { paths } from "@/routes";

interface SubscriptionProps {
  plan: Plan;
  href?: string;
  variant?: "compact" | "detailed";
  isCurrent?: boolean;
}

export function Subscription({
  plan,
  href = paths.paymentMethod(),
  variant = "detailed",
  isCurrent = false,
}: SubscriptionProps) {
  const { title, description, price, period = "Per month", features } = plan;

  if (variant === "detailed") {
    return (
      <div className="col-span-3 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
        <div className="crd relative rounded-3xl border border-[#D5D5D5] bg-white shadow-lg">
          <div className="upr border-b border-[#D5D5D5] p-6">
            <h3 className="pb-3.5 text-2xl font-semibold text-black">
              {title}
            </h3>
            <p>{description}</p>
          </div>
          <div className="lwr p-6">
            <div className="flex items-center gap-2.5">
              <h4 className="text-3xl font-bold text-black">{price}</h4>
              <span className="font-normal text-[#9D9D9D]">{period}</span>
            </div>
            <div className="lst my-8">
              <ul>
                {features.map((feature, index) => (
                  <li key={index} className="my-5 flex items-center gap-1.5">
                    <span>
                      <BadgeCheck color="#FFCC00" />
                    </span>
                    <p className="text-[#505050]">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="btn mt-14">
              <button className="w-full cursor-pointer rounded-xl bg-[#53A2EB] p-4 font-medium text-white">
                <Link href={href}>Choose This Plan</Link>
              </button>
            </div>
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
            "crd rounded-xl border border-[#DADADA] px-6 py-7",
            isCurrent && "relative"
          )}
        >
          {isCurrent && (
            <div className="absolute -top-6 right-3 rounded-2xl border-4 border-white bg-[#FFE7E4] px-4 py-3 text-center text-sm font-semibold text-[#F15642] opacity-100">
              Current Plan
            </div>
          )}
          <div className={cn(isCurrent && "opacity-40")}>
            <div className="mb-4 border-b border-[#DADADA] pb-4">
              <h3 className="mb-2 text-2xl font-bold">{title}</h3>
              <p className="text-sm font-light">{description}</p>
            </div>
            <div className="my-6 flex items-center gap-2">
              <h2 className="text-3xl font-bold text-[#53A2EB]">{price}</h2>
              <p className="text-[#9D9D9D]">{period}</p>
            </div>
            {features.slice(0, 4).map((feature, index) => (
              <div className="lst mb-5 flex gap-2" key={index}>
                <span>
                  <BadgeCheck width={23} height={23} color="#FFCC00" />
                </span>
                <p className="text-[#505050]">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
