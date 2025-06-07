import { ChevronRight } from "@/lib/icons";
import { paths } from "@/routes";
import Link from "next/link";
import { SubscriptionPlans as SubscriptionPlansComponent } from "@/features/subscriptions/components/subscription-plans";

export default function SubscriptionPlans() {
  return (
    <section className="mths_bg p-5 2xl:h-screen md:min-h-screen bg-no-repeat bg-cover ">
      <div className="container mx-auto h-full">
        <div className="grid grid-cols-3 h-full content-center gap-8">
          <div className="col-span-3">
            <div className="hed my-3.5 mb-10 text-center relative">
              <h1 className="text-3xl font-bold text-center mb-2 text-[#000000]">
                Subscription Plans
              </h1>
              <p className="text-[#505050] text-sm">
                Select a subscription plan that best suits your needs.
              </p>
            </div>
          </div>
          <SubscriptionPlansComponent href={paths.paymentMethod()} />
          <div className="col-span-3">
            <div className="flex justify-center relative">
              <Link href={paths.dashboard()}>
                <button className="bg-white ps-10 pe-7 py-4 border border-[#53A2EB] text-[#53A2EB] hover:bg-[#53A2EB] hover:text-[#fff] group font-semibold rounded-xl flex items-center skp_btn cursor-pointer">
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
