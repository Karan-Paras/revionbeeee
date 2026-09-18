"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, Clock3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
const COLUMN_H = 224;
const DROPDOWN_H = 260;
const GAP = 8;

function columnScrollTop(list: HTMLDivElement, idx: number, itemCount: number) {
  const max = Math.max(0, itemCount * ITEM_H - COLUMN_H);
  return Math.min(max, Math.max(0, idx * ITEM_H - (COLUMN_H - ITEM_H) / 2));
}

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
    listRef.current.scrollTop = columnScrollTop(
      listRef.current,
      idx,
      items.length
    );
  }, [selected, items]);

  return (
    <div
      ref={listRef}
      className="flex-1 snap-y snap-mandatory overflow-y-auto overscroll-contain py-4"
      style={{
        height: COLUMN_H,
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {items.map((item) => {
        const active = item === selected;
        return (
          <div
            key={item}
            onClick={() => onSelect(item)}
            style={{ height: ITEM_H }}
            className={cn(
              "flex snap-center cursor-pointer select-none items-center justify-center text-base font-medium transition-colors",
              active
                ? "text-[#53a2eb]"
                : "text-[#444] hover:bg-[#f2f7fd] hover:text-[#53a2eb]"
            )}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

type Position = {
  top: number;
  left: number;
  width: number;
  openUp: boolean;
};

export function TimeSelect({
  value,
  onChange,
  ariaLabel,
  error,
}: TimeSelectProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [hh, mm] = value ? value.split(":") : ["", ""];

  function selectHour(h: string) {
    onChange(`${h}:${mm || "00"}`);
  }

  function selectMinute(m: string) {
    onChange(`${hh || "00"}:${m}`);
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        containerRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (!open) return;

    function measure() {
      const el = containerRef.current;
      if (!el) return;
      const trigger = el.getBoundingClientRect();
      const openUp =
        window.innerHeight - trigger.bottom < DROPDOWN_H &&
        trigger.top >= DROPDOWN_H;
      const top = openUp
        ? trigger.top - DROPDOWN_H - GAP
        : Math.min(
            trigger.bottom + GAP,
            Math.max(GAP, window.innerHeight - DROPDOWN_H - GAP)
          );
      setPosition({
        top,
        left: trigger.left,
        width: trigger.width,
        openUp,
      });
    }

    measure();
    window.addEventListener("scroll", measure, true);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure, true);
      window.removeEventListener("resize", measure);
    };
  }, [open]);

  function toggleOpen() {
    setOpen((o) => !o);
    if (!open) setPosition(null);
  }

  const display = value ? `${hh}:${mm}` : "";

  return (
    <div ref={containerRef} className="relative w-full" aria-label={ariaLabel}>
      <div
        className={cn(
          "relative flex h-11 w-full items-center rounded-lg border bg-white px-3 text-sm transition focus-within:ring-4 focus-within:ring-[#53a2eb]/10",
          error ? "border-red-400" : "border-[#e1e5e9]",
          open ? "border-[#53a2eb]" : "hover:border-[#b0c8e8]"
        )}
      >
        <Clock3 size={15} className="shrink-0 text-[#9aa7be]" />
        <input
          type="text"
          readOnly
          value={display}
          placeholder="HH:MM"
          className="ml-2 w-full cursor-pointer bg-transparent text-sm font-medium text-[#222] outline-none placeholder:text-[#aaa]"
          onClick={() => setOpen(true)}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={toggleOpen}
          className="shrink-0"
        >
          <ChevronDown
            size={16}
            className={cn(
              "text-[#9aa7be] transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </button>
      </div>

      {open &&
        position &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              width: position.width,
            }}
            className="z-[9999] overflow-hidden rounded-xl border border-[#e1e5e9] bg-white shadow-[0_12px_40px_rgba(31,45,61,0.18)]"
          >
            <div className="grid grid-cols-2 border-b border-[#eef0f3] bg-[#fafbfc]">
              {["Hour", "Minute"].map((label, index) => (
                <span
                  key={label}
                  className={cn(
                    "py-2 text-center text-[10px] font-semibold tracking-wide text-[#9aa7be] uppercase",
                    index === 1 && "border-l border-[#eef0f3]"
                  )}
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="relative flex">
              <ScrollColumn
                items={HOURS}
                selected={hh ?? ""}
                onSelect={selectHour}
              />
              <div className="w-px shrink-0 self-stretch bg-[#eef0f3]" />
              <ScrollColumn
                items={MINUTES}
                selected={mm ?? ""}
                onSelect={selectMinute}
              />

              <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-white to-transparent" />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
