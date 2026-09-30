export default function TeacherRouteLoading() {
  return (
    <main className="min-h-full bg-[#f5f6f8] p-4 sm:p-8 lg:px-9 lg:py-9">
      <div className="mx-auto max-w-[1440px]">
        <div className="h-8 w-40 animate-pulse rounded bg-[#e9ecef]" />
        <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-[#e9ecef]" />

        <section className="mt-7 grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[86px] animate-pulse rounded-xl bg-white shadow-sm"
            />
          ))}
        </section>

        <section className="mt-8 rounded-[22px] bg-white px-4 py-5 shadow-[0_1px_2px_rgba(20,30,40,0.02)] sm:px-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-10 w-full max-w-[300px] animate-pulse rounded-lg bg-[#e9ecef]" />
            <div className="h-10 w-full max-w-[230px] animate-pulse rounded-lg bg-[#e9ecef]" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="h-14 animate-pulse rounded-lg bg-[#f1f3f5]"
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
