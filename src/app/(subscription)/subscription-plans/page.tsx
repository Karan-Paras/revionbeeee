import { SubscriptionPlans as SubscriptionPlansComponent } from "@/features/subscriptions/components/subscription-plans";
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
          <SubscriptionPlansComponent
            href={paths.dashboard()}
            callback={paths.dashboard()}
          />
        </div>
      </div>
    </section>
  );
}
