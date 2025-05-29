import { BadgeCheck } from "@/lib/icons";
import Link from "next/link";

interface SubscriptionProps {
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  href: string;
}

export function Subscription({
  title,
  description,
  price,
  period = "Per month",
  features,
  href,
}: SubscriptionProps) {
  return (
    <div className="col-span-3 2xl:col-span-1 xl:col-span-1 lg:col-span-1">
      <div className="crd border rounded-3xl relative bg-white border-[#D5D5D5] shadow-lg">
        <div className="upr p-6 border-b border-[#D5D5D5]">
          <h3 className="text-2xl text-black font-semibold pb-3.5">{title}</h3>
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
