import { act, fireEvent, render } from "@testing-library/react";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useDismissPhoneCountryDropdown } from "./use-dismiss-phone-country-dropdown";

/**
 * Simulates the correct usage pattern: the hook handles closing the dropdown
 * after selection; onChange only updates state.
 */
function Harness() {
  useDismissPhoneCountryDropdown();
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  return (
    <PhoneInput
      defaultCountry="in"
      value={mobileNumber}
      forceDialCode
      onChange={(phone, { country }) => {
        setMobileNumber(phone);
        setCountryCode(`+${country.dialCode.replace(/\D/g, "")}`);
      }}
    />
  );
}

const selectorButton = "button[aria-label='Country selector']";
const dropdownItem = (iso: string) => `li[data-country='${iso}']`;

function firePointerDown(target: Element) {
  target.dispatchEvent(
    new Event("pointerdown", {
      bubbles: true,
      cancelable: true,
      composed: true,
    })
  );
}

describe("phone country dropdown selection", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("changes country when an option is clicked", async () => {
    vi.useFakeTimers();
    render(<Harness />);

    const openButton =
      document.querySelector<HTMLButtonElement>(selectorButton);
    expect(openButton).toBeTruthy();

    await act(async () => {
      fireEvent.click(openButton!);
    });
    expect(
      getComputedStyle(
        document.querySelector<HTMLElement>(
          ".react-international-phone-country-selector-dropdown"
        )!
      ).display
    ).toBe("block");

    const usOption = document.querySelector<HTMLElement>(dropdownItem("us"));
    firePointerDown(usOption!);
    await act(async () => {
      usOption!.click();
      await vi.advanceTimersByTimeAsync(300);
    });

    const input = document.querySelector<HTMLInputElement>("input[type='tel']");
    expect(input?.value).toBe("+1 ");
    expect(openButton?.getAttribute("aria-expanded")).toBe("false");
  });
});
