import { SubscriptionPlans } from "@/features/subscriptions/components/subscription-plans";

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 2xl:px-0 lg:px-20 px-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-7">
          <div className="col-span-3">
            <div className="lay md:w-6/12 w-full mx-auto text-center">
              <div className="itm mb-5 flex items-center justify-center gap-1.5">
                <span>
                  <svg width="42" height="2" viewBox="0 0 42 2" fill="none">
                    <rect y="0.5" width="42" height="1" fill="#53A2EB" />
                  </svg>
                </span>
                <p className="text-[#53A2EB]">Pricing Plan</p>
              </div>
              <div className="hed">
                <h3 className="md:text-5xl text-3xl font-bold leading-normal">
                  Choose Your <br /> Subscription plan
                </h3>
              </div>
            </div>
          </div>
          <SubscriptionPlans />
        </div>
      </div>
    </section>
  );
}
