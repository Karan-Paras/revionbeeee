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
          if (!selector || selector.contains(target)) return;

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

      // The controlled phone value can cause a second render immediately
      // after the library closes its menu. Check again after those renders.
      window.setTimeout(closeIfStillOpen, 0);
      window.setTimeout(closeIfStillOpen, 75);
      window.setTimeout(closeIfStillOpen, 200);
    };

    document.addEventListener("pointerdown", dismissOpenDropdown);
    document.addEventListener("pointerdown", dismissAfterSelection, true);
    return () => {
      document.removeEventListener("pointerdown", dismissOpenDropdown);
      document.removeEventListener("pointerdown", dismissAfterSelection, true);
    };
  }, []);
}
