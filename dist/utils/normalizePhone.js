export function normalizePhone(phone) {
    return phone.replace(/\D/g, "").startsWith("91")
        ? `+${phone.replace(/\D/g, "")}`
        : `+${phone.replace(/\D/g, "")}`;
}
//# sourceMappingURL=normalizePhone.js.map