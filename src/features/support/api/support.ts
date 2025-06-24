import { z } from "zod";
import api from "@/lib/api";
import { SupportSchema } from "@/features/support/schemas";

export async function support({
  firstName,
  lastName,
  email,
  phoneNumber,
  message,
}: z.infer<typeof SupportSchema>) {
  const apiUrl = "/support";

  return await api(apiUrl, "POST", {
    firstName,
    lastName,
    email,
    phoneNumber,
    aboutUs: message,
  });
}
