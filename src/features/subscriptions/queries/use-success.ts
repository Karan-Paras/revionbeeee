import { useSessionStore } from "@/features/subscriptions/stores/use-session-store";
import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType } from "hono";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.subscriptions.success)["$post"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.subscriptions.success)["$post"]
>["json"];

export const useSuccess = () => {
  const { clearSessionId } = useSessionStore();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.subscriptions.success.$post({
        json,
      });

      if (!response.ok) {
        throw new Error(
          "Something went wrong while processing your subscription."
        );
      }

      return response.json();
    },
    onSuccess: () => {
      clearSessionId();
    },
  });
};
