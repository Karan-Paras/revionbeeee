import { SubscriptionPlans } from "@/features/subscriptions/components/subscription-plans";

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 2xl:px-0 xl:px-20 px-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 xl:gap-7 gap-3">
          <div className="col-span-3">
            <div className="lay md:w-6/12 w-full mx-auto text-center">
              <div className="itm mb-5 flex items-center justify-center gap-1.5">
                {/* <span>
                  <Minus width={42} height={2} color="#53A2EB" />
                </span> */}
                <p className="text-[#53A2EB]">Pricing Plan</p>
              </div>
              <div className="hed">
                <h3 className="2xl:text-6xl xl:text-5xl lg:text-4xl text-3xl font-bold xl:leading-normal lg:leading-10 mb-3">
                  Choose Your <br /> Subscription plan
                </h3>
              </div>
            </div>
          </div>
          <SubscriptionPlans href="#" />
        </div>
      </div>
    </section>
  );
}
