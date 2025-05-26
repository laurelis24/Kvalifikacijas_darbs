export function convertToLatvianTime(date: string) {
    return new Date(date).toLocaleString("lv-LV", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Riga",
    });
}
