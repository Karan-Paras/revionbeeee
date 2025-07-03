import { Button } from "@/components/ui/button";

import { useSubscriptionModal } from "@/features/subscriptions/stores/use-subscription-modal";
import { FREE_PLAN } from "@/features/subscriptions/types";
import { useGetProfile } from "@/features/user/queries/use-get-profile";
import { BadgeCheck } from "@/lib/icons";
import { addDays, format, isAfter } from "date-fns";
import Skeleton from "react-loading-skeleton";

export function CurrentPlan() {
  const { onOpen } = useSubscriptionModal();
  const CURRENT_PLAN = FREE_PLAN;

  const { title, description, price, period, features } = CURRENT_PLAN;

  const { data: profile, isPending } = useGetProfile();

  const getExpiryDate = () => {
    if (isPending) {
      return <Skeleton width={100} />;
    }

    if (profile) {
      const createdAt = new Date(profile.data.created_at);
      const expiryDate = addDays(createdAt, 3);
      const today = new Date();

      if (isAfter(today, expiryDate)) {
        return (
          <div className="col-span-2 px-6 py-8">
            <span className="text-lg font-bold text-[#FB4F1B]">Expired</span>
          </div>
        );
      }

      return (
        <div className="col-span-2 px-6 py-8">
          <p>Expires on</p>
          <span className="text-lg font-bold text-[#FB4F1B]">
            {format(expiryDate, "dd MMM yyyy")}
          </span>
        </div>
      );
    }

    return "";
  };

  return (
    <div className="frm py-5">
      <div className="mx-auto w-10/12 max-w-lg rounded-2xl border border-[#D5D5D5]">
        <div className="grid grid-cols-5 items-center">
          <div className="col-span-3 px-6 py-8">
            <h3 className="mb-2 text-2xl font-bold">{title}</h3>
            <p>{description}</p>
          </div>
          {getExpiryDate()}
          <div className="col-span-5 border-t border-[#D9D9D9] px-6 py-5">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold">{price}</h3>
              <span className="text-[#9D9D9D]">{period}</span>
            </div>
          </div>
        </div>
        <div className="col-span-5">
          {features.map((content) => (
            <div key={content} className="itm mb-5 flex gap-4 px-6">
              <div className="icn">
                <BadgeCheck width={23} height={23} color="#FFCC00" />
              </div>
              <div className="desc">
                <p>{content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-5">
          <div className="btn mb-4 px-6 py-3">
            <Button type="button" onClick={onOpen}>
              Upgrade Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
