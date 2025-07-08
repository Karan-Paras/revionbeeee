import { fetchServer } from "@/lib/fetch-server";

export async function purchaseSubscription(data: {
  subscriptionID: string;
  customerID: string;
  planType: "monthly" | "yearly";
  amount: number | null;
}) {
  const apiUrl = "/subscription/purchase";
  return await fetchServer(apiUrl, "POST", {
    subscriptionID: data.subscriptionID,
    customerID: data.customerID,
    planType: data.planType === "monthly" ? 1 : 2,
    amount: data.amount,
  });
}
