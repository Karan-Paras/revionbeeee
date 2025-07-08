import { SupportSchema } from "@/features/support/schemas";
import { fetchServer } from "@/lib/fetch-server";
import { z } from "zod";

export async function support({
  firstName,
  lastName,
  email,
  phoneNumber,
  message,
}: z.infer<typeof SupportSchema>) {
  const apiUrl = "/support";

  return await fetchServer(apiUrl, "POST", {
    firstName,
    lastName,
    email,
    phoneNumber,
    aboutUs: message,
  });
}
