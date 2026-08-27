export function getNationalPhoneNumber(
  phoneNumber: string,
  countryCode: string
) {
  const phoneDigits = phoneNumber.replace(/\D/g, "");
  const countryCodeDigits = countryCode.replace(/\D/g, "");

  return phoneDigits.startsWith(countryCodeDigits)
    ? phoneDigits.slice(countryCodeDigits.length)
    : phoneDigits;
}

export function getInternationalPhoneNumber(
  phoneNumber: FormDataEntryValue | null,
  countryCode: FormDataEntryValue | null
) {
  const phoneDigits = String(phoneNumber ?? "").replace(/\D/g, "");
  const normalizedCountryCode = `+${String(countryCode ?? "").replace(/\D/g, "")}`;

  return `${normalizedCountryCode}${phoneDigits}`;
}
