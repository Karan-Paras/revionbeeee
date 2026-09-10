"use client";

import { cn } from "@/lib/utils";
import { Clock3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TimeSelectProps {
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
  error?: boolean;
}

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);

const ITEM_H = 40;

function ScrollColumn({
  items,
  selected,
  onSelect,
}: {
  items: string[];
  selected: string;
  onSelect: (v: string) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const idx = items.indexOf(selected);
    if (idx < 0 || !listRef.current) return;
    listRef.current.scrollTop = idx * ITEM_H;
  }, [selected, items]);

  return (
    <div
      ref={listRef}
      className="flex-1 overflow-y-auto"
      style={{ height: 200, scrollbarWidth: "none" }}
    >
      {items.map((item) => {
        const active = item === selected;
        return (
          <div
            key={item}
            onClick={() => onSelect(item)}
            style={{ height: ITEM_H }}
            className={cn(
              "flex cursor-pointer items-center justify-center text-base font-semibold select-none transition-colors",
              active
                ? "rounded-lg bg-[#53a2eb] text-white"
                : "text-[#444] hover:text-[#53a2eb]"
            )}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

export function TimeSelect({
  value,
  onChange,
  ariaLabel,
  error,
}: TimeSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [hh, mm] = value ? value.split(":") : ["", ""];

  function selectHour(h: string) {
    onChange(`${h}:${mm || "00"}`);
  }

  function selectMinute(m: string) {
    onChange(`${hh || "00"}:${m}`);
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const display = value ? `${hh}:${mm}` : "HH:MM";

  return (
    <div ref={containerRef} className="relative w-full" aria-label={ariaLabel}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-11 w-full items-center gap-2 rounded-lg border bg-white px-3 text-sm",
          error ? "border-red-400" : "border-[#e1e5e9]",
          open ? "border-[#53a2eb]" : "hover:border-[#b0c8e8]"
        )}
      >
        <Clock3 size={15} className="shrink-0 text-[#9aa7be]" />
        <span
          className={cn(
            "flex-1 text-left font-medium",
            value ? "text-[#222]" : "text-[#aaa]"
          )}
        >
          {display}
        </span>
        <Clock3 size={15} className="shrink-0 text-[#9aa7be]" />
      </button>

      {/* Dropdown — same width as trigger */}
      {open && (
        <div className="absolute top-[48px] left-0 z-50 flex w-full overflow-hidden rounded-xl border border-[#e1e5e9] bg-white shadow-xl">
          <ScrollColumn
            items={HOURS}
            selected={hh ?? ""}
            onSelect={selectHour}
          />
          <div className="w-px shrink-0 self-stretch bg-[#eee]" />
          <ScrollColumn
            items={MINUTES}
            selected={mm ?? ""}
            onSelect={selectMinute}
          />
        </div>
      )}
    </div>
  );
}
