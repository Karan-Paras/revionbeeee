import { SubscriptionPlans } from "@/features/subscriptions/components/subscription-plans";

export function Pricing() {
  return (
    <section id="pricing" className="relative px-10 py-20 xl:px-20 2xl:px-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-3 xl:gap-7">
          <div className="col-span-3">
            <div className="lay mx-auto w-full text-center md:w-6/12">
              <div className="itm mb-5 flex items-center justify-center gap-1.5">
                {/* <span>
                  <Minus width={42} height={2} color="#53A2EB" />
                </span> */}
                <p className="text-[#53A2EB]">Pricing Plan</p>
              </div>
              <div className="hed">
                <h3 className="mb-3 text-3xl font-bold lg:text-4xl lg:leading-10 xl:text-5xl xl:leading-normal 2xl:text-6xl">
                  Choose Your <br /> Subscription plan
                </h3>
              </div>
            </div>
          </div>
          <SubscriptionPlans href="#pricing" />
        </div>
      </div>
    </section>
  );
}
