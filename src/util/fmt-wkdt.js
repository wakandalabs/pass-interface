export function fmtWkdt(balance, cur = false) {
    if (balance == null) return null
    return [
        String(balance).replace(/0+$/, "").replace(/\.$/, ""),
        cur && "WKDT",
    ]
        .filter(Boolean)
        .join(" ")
}
