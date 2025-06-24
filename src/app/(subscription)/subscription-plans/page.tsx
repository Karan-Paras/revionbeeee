import Link from "next/link";

import { SubscriptionPlans as SubscriptionPlansComponent } from "@/features/subscriptions/components/subscription-plans";

import { ChevronRight } from "@/lib/icons";

import { paths } from "@/routes";

export default function SubscriptionPlans() {
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
          <SubscriptionPlansComponent href={paths.paymentMethod()} />
          <div className="col-span-3">
            <div className="relative flex justify-center">
              <Link href={paths.dashboard()}>
                <button className="group skp_btn flex cursor-pointer items-center rounded-xl border border-[#53A2EB] bg-white py-4 ps-10 pe-7 font-semibold text-[#53A2EB] hover:bg-[#53A2EB] hover:text-[#fff]">
                  Skip <ChevronRight color="#53a2eb" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
