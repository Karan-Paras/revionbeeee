"use client";

import { useLogout } from "@/features/hooks/use-logout";
import { useEffect } from "react";

export default function Error() {
  const logout = useLogout();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="text-black flex items-center min-h-screen justify-center flex-col">
      <div className="error_icn flex flex-col justify-center items-center p-5 ">
        <h2 className="text-9xl text-[#fbbe1b] font-bold pt-2 mb-0 text-center">
          500
        </h2>
        <p className="text-2xl text-black font-normal py-3 text-center">
          Something went wrong
        </p>
      </div>
    </div>
  );
}
