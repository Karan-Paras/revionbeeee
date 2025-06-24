"use client";

import Skeleton from "react-loading-skeleton";
import { useGetDashboardAnalytics } from "@/features/dashboard/queries/use-use-dashboard-analytics";

import { ClockFading, HelpLightBulb, SyncCheck } from "@/lib/icons";

import "react-loading-skeleton/dist/skeleton.css";
import { cn } from "@/lib/utils";

export function DashboardCard() {
  const { data } = useGetDashboardAnalytics();

  const ANALYTICS = [
    {
      icon: <HelpLightBulb />,
      title: "Total Quiz",
      value: data ? (
        data.data.totalQuizzes
      ) : (
        <Skeleton width={100} baseColor="#F2F9FF" highlightColor="#E1F5FE" />
      ),
      bgColor: "bg-[#F2F9FF]",
      borderColor: "border-[#53A2EB]",
    },
    {
      icon: <ClockFading />,
      title: "In Progress Topics",
      value: data ? (
        data.data.overallProgress
      ) : (
        <Skeleton width={100} baseColor="#FFFAEB" highlightColor="#FFE8B5" />
      ),
      bgColor: "bg-[#FFFAEB]",
      borderColor: "border-[#FBBE1B]",
    },
    {
      icon: <SyncCheck />,
      title: "Completed Topics",
      value: data ? (
        data.data.topicsCompleted
      ) : (
        <Skeleton width={100} baseColor="#EFFFFA" highlightColor="#C6F9E8" />
      ),
      bgColor: "bg-[#EFFFFA]",
      borderColor: "border-[#13C38B]",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-8 rounded-xl bg-white p-8">
      <div className="col-span-3">
        <h3 className="border-b border-[#D9D9D9] pb-3 text-2xl font-semibold text-[#505050]">
          Dashboard
        </h3>
      </div>
      {ANALYTICS.map(({ icon, title, value, bgColor, borderColor }, index) => (
        <div key={index} className="col-span-3 md:col-span-1">
          <div
            className={cn(
              "grid min-h-80 content-center justify-items-center gap-4 rounded-2xl border border-dashed",
              borderColor,
              bgColor
            )}
          >
            <div className="flex size-32 items-center justify-center overflow-hidden rounded-full bg-white">
              {icon}
            </div>
            <div className="desc text-center">
              <h3 className="mb-2.5 text-4xl font-bold">{value}</h3>
              <p className="text-xl font-light">{title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
