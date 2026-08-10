import { paths } from "@/routes";
import { redirect } from "next/navigation";

export default function page() {
  return redirect(paths.accounts.myProfile());
}
