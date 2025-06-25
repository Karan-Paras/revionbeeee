import api from "@/lib/api";

export async function purchaseSubscription(data: {
  subscriptionID: string;
  customerID: string;
  planType: "monthly" | "yearly";
  amount: number | null;
}) {
  const apiUrl = "/subscription/purchase";
  return await api(apiUrl, "POST", {
    subscriptionID: data.subscriptionID,
    customerID: data.customerID,
    planType: data.planType === "monthly" ? 1 : 2,
    amount: data.amount,
  });
}
