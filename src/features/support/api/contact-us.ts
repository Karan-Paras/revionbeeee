import { ContactUsSchema } from "@/features/support/schemas";
import api from "@/lib/api";
import { z } from "zod";

type ContactUsInput = z.infer<typeof ContactUsSchema>;

export async function contactUs(data: ContactUsInput) {
  const apiUrl = "/contact/us";

  if (data.attachment instanceof File) {
    const formData = new FormData();
    for (const key in data) {
      if (key === "attachment") {
        const file = data[key] as File | undefined;
        if (file) {
          formData.append(key, file);
        }
      } else {
        formData.append(key, data[key as keyof ContactUsInput] as string);
      }
    }

    return await api(apiUrl, "POST", formData);
  } else {
    return await api(apiUrl, "POST", data);
  }
}
