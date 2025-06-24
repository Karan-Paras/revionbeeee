"use client";

export default function Error() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-black">
      <div className="error_icn flex flex-col items-center justify-center p-5">
        <h2 className="mb-0 pt-2 text-center text-9xl font-bold text-[#fbbe1b]">
          500
        </h2>
        <p className="py-3 text-center text-2xl font-normal text-black">
          Something went wrong
        </p>
      </div>
    </div>
  );
}
