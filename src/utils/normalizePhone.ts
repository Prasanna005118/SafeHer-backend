export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "").startsWith("91")
    ? `+${phone.replace(/\D/g, "")}`
    : `+${phone.replace(/\D/g, "")}`;
}