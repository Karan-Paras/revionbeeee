import { Checkbox } from "@/components/ui/checkbox";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function LoginForm() {
  return (
    <div className="spc_frm mt-9">
      <form action="">
        <div className="itm relative mb-3.5">
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            type="email"
            iconClassName="mail_bg"
            placeholder="john@example.com"
            id="email"
          />
        </div>
        <div className="itm relative mb-5">
          <FormLabel htmlFor="password">Password</FormLabel>
          <div className="pass_bg icn_bg relative my-1.5">
            <Input
              type="password"
              iconClassName="pass_bg"
              placeholder="Enter password"
              id="password"
            />
          </div>
        </div>
        <div className="flex justify-between items-center mb-8">
          <div className="chk flex gap-1.5">
            <Checkbox />
            <label
              htmlFor="vehicle1"
              className="text-[#0B0B0B] font-light text-sm"
            >
              Remember me
            </label>
          </div>
          <div className="lnk">
            <Link
              href="/forget-password"
              className="text-[#53A2EB] font-medium"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <div className="btn">
          <button className="bg-[#53A2EB] w-full rounded-md text-white p-4 font-medium cursor-pointer">
            Sign In
          </button>
        </div>
        <div className="lnk my-10">
          <p className="text-center text-[#505050]">
            Not registered yet?&nbsp;
            <Link
              className="text-[#53A2EB] underline underline-offset-5 font-semibold"
              href="/signup"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
