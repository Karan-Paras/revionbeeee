import { Plan } from "@/features/subscriptions/types";
import { BadgeCheck } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { paths } from "@/routes";
import Link from "next/link";

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
      <div className="col-span-3 2xl:col-span-1 xl:col-span-1 lg:col-span-1">
        <div className="crd border rounded-3xl relative bg-white border-[#D5D5D5] shadow-lg">
          <div className="upr p-6 border-b border-[#D5D5D5]">
            <h3 className="text-2xl text-black font-semibold pb-3.5">
              {title}
            </h3>
            <p>{description}</p>
          </div>
          <div className="lwr p-6">
            <div className="flex gap-2.5 items-center">
              <h4 className="text-3xl font-bold text-black">{price}</h4>
              <span className="text-[#9D9D9D] font-normal">{period}</span>
            </div>
            <div className="lst my-8">
              <ul>
                {features.map((feature, index) => (
                  <li key={index} className="flex gap-1.5 my-5 items-center">
                    <span>
                      <BadgeCheck color="#FFCC00" />
                    </span>
                    <p className="text-[#505050]">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="btn mt-14">
              <button className="bg-[#53A2EB] w-full rounded-xl text-white p-4 font-medium cursor-pointer">
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
            "crd border border-[#DADADA] rounded-xl px-6 py-7",
            isCurrent && "relative"
          )}
        >
          {isCurrent && (
            <div className="absolute -top-6 right-3 bg-[#FFE7E4] border-4 border-white text-[#F15642] px-4 py-3 opacity-100 text-center rounded-2xl text-sm font-semibold">
              Current Plan
            </div>
          )}
          <div className={cn(isCurrent && "opacity-40")}>
            <div className="border-b border-[#DADADA] mb-4 pb-4">
              <h3 className="font-bold text-2xl mb-2">{title}</h3>
              <p className="text-sm font-light">{description}</p>
            </div>
            <div className="flex items-center gap-2 my-6">
              <h2 className="text-[#53A2EB] text-3xl font-bold">{price}</h2>
              <p className="text-[#9D9D9D]">{period}</p>
            </div>
            {features.slice(0, 4).map((feature, index) => (
              <div className="lst flex gap-2 mb-5" key={index}>
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
