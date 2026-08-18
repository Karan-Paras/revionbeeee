"use client";

import { useEffect } from "react";

const selectorClass = ".react-international-phone-country-selector";
const dropdownClass = ".react-international-phone-country-selector-dropdown";
const buttonClass = ".react-international-phone-country-selector-button";

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

    document.addEventListener("pointerdown", dismissOpenDropdown);
    return () =>
      document.removeEventListener("pointerdown", dismissOpenDropdown);
  }, []);
}
