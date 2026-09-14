"use client";

import { useEffect } from "react";

const selectorClass = ".react-international-phone-country-selector";
const dropdownClass = ".react-international-phone-country-selector-dropdown";
const buttonClass = ".react-international-phone-country-selector-button";
const optionClass =
  ".react-international-phone-country-selector-dropdown__list-item";

export function closePhoneCountryDropdown(input: HTMLElement | null) {
  window.requestAnimationFrame(() => {
    const container = input?.closest(
      ".react-international-phone-input-container"
    );
    const button = container?.querySelector<HTMLButtonElement>(buttonClass);
    if (button?.getAttribute("aria-expanded") === "true") {
      button.click();
    }
  });
}

/** Closes an open phone country menu when the user clicks outside its selector. */
export function useDismissPhoneCountryDropdown() {
  useEffect(() => {
    const dismissOpenDropdown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      document
        .querySelectorAll<HTMLElement>(dropdownClass)
        .forEach((dropdown) => {
          if (getComputedStyle(dropdown).display === "none") return;

          const selector = dropdown.closest<HTMLElement>(selectorClass);
          if (!selector) return;

          // Guard against both the selector container and the dropdown itself
          // (the dropdown may have already been detached from the selector after
          // a controlled re-render, so check both to avoid false-positives).
          if (selector.contains(target) || dropdown.contains(target)) return;

          selector.querySelector<HTMLButtonElement>(buttonClass)?.click();
        });
    };

    const dismissAfterSelection = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const option = target.closest<HTMLElement>(optionClass);
      const selector = option?.closest<HTMLElement>(selectorClass);
      if (!selector) return;

      const closeIfStillOpen = () => {
        const button = selector.querySelector<HTMLButtonElement>(buttonClass);
        if (button?.getAttribute("aria-expanded") === "true") {
          button.click();
        }
      };

      // Wait for the controlled-value re-render cycle to settle, then close
      // once if the library left the dropdown open.
      window.setTimeout(closeIfStillOpen, 150);
    };

    document.addEventListener("pointerdown", dismissOpenDropdown);
    document.addEventListener("pointerdown", dismissAfterSelection, true);
    return () => {
      document.removeEventListener("pointerdown", dismissOpenDropdown);
      document.removeEventListener("pointerdown", dismissAfterSelection, true);
    };
  }, []);
}
