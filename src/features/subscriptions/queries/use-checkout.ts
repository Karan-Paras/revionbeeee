import { useSessionStore } from "@/features/subscriptions/stores/use-session-store";
import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType } from "hono";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.subscriptions.checkout)["$post"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.subscriptions.checkout)["$post"]
>["json"];

export const useCheckout = () => {
  const { setSessionId } = useSessionStore();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.subscriptions.checkout.$post({
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      return response.json();
    },
    onSuccess: ({ data }) => {
      const { sessionId, url } = data;

      if (!url || !sessionId) {
        toast.error("Failed to create session");
        return;
      }

      console.log({ sessionId });

      setSessionId(sessionId);

      window.location.href = url;
    },
    onError: () => {
      toast.error("Failed to create session");
    },
  });
};
