import { useBilling } from "@/features/subscriptions/queries/use-billing";
import { useGetProfile } from "@/features/user/queries/use-get-profile";
import { Billing as BillingIcon } from "@/lib/icons";
import { usePathname } from "next/navigation";

export function Billing() {
  const pathname = usePathname();
  const { data, isPending } = useGetProfile();

  const mutation = useBilling();

  const onClick = () => {
    mutation.mutate({
      callback: pathname,
      customerId: data?.data.customerID || "",
    });
  };

  return (
    <div className="container mx-auto h-full">
      <div className="grid h-full content-center p-10">
        <div className="img flex justify-center">
          <BillingIcon />
        </div>
        <div className="desc my-5 text-center">
          <h3 className="mb-3 text-2xl font-bold text-[#0B0B0B]">
            Manage Your Subscription
          </h3>
          <p className="text-sm font-light text-[#6C6C6C]">
            You&apos;ll be redirected to our secure Stripe billing portal to
            view or cancel your subscription.
          </p>
        </div>
        <div className="btn flex justify-center">
          <button
            onClick={onClick}
            disabled={isPending || mutation.isPending}
            className="w-5/12 cursor-pointer rounded-xl bg-[#53A2EB] p-4 font-medium text-white"
          >
            {isPending
              ? "Processing..."
              : mutation.isPending
                ? "Redirecting..."
                : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
