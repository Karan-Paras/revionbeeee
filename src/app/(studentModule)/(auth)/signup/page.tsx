import LoginCommonPage from "@/components/common/logincommonpage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Revision Bee",
  description:
    "Create your Revision Bee account and start mastering your subjects today.",
};

export default function Signup() {
  return <LoginCommonPage mode="signup" />;
}
