export type Inquiry = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  propertyType: string;
  service: string;
  message: string;
  contactPreference: "Telefon" | "E-Mail" | "";
  privacyAccepted: boolean;
};

export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const str = (value: unknown, max = 200) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export function parseInquiry(input: Record<string, unknown>): { data: Inquiry; errors: InquiryErrors } {
  const preference = str(input.contactPreference);
  const data: Inquiry = {
    firstName: str(input.firstName, 80),
    lastName: str(input.lastName, 80),
    email: str(input.email, 160),
    phone: str(input.phone, 40),
    location: str(input.location, 200),
    propertyType: str(input.propertyType, 80),
    service: str(input.service, 80),
    message: str(input.message, 4000),
    contactPreference: preference === "Telefon" || preference === "E-Mail" ? preference : "",
    privacyAccepted: input.privacyAccepted === true || input.privacyAccepted === "on",
  };

  const errors: InquiryErrors = {};
  if (!data.firstName) errors.firstName = "Bitte geben Sie Ihren Vornamen an.";
  if (!data.lastName) errors.lastName = "Bitte geben Sie Ihren Nachnamen an.";
  if (!data.email) errors.email = "Bitte geben Sie Ihre E-Mail-Adresse an.";
  else if (!EMAIL_PATTERN.test(data.email)) errors.email = "Bitte prüfen Sie Ihre E-Mail-Adresse.";
  if (data.contactPreference === "Telefon" && !data.phone)
    errors.phone = "Bitte geben Sie eine Telefonnummer an, wenn wir Sie telefonisch erreichen sollen.";
  if (data.phone && !/^[\d\s+()/-]{5,}$/.test(data.phone)) errors.phone = "Bitte prüfen Sie Ihre Telefonnummer.";
  if (!data.message) errors.message = "Bitte beschreiben Sie kurz Ihr Anliegen.";
  if (!data.privacyAccepted) errors.privacyAccepted = "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.";

  return { data, errors };
}
