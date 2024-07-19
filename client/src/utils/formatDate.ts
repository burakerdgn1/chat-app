export const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();
    const isYesterday =
        date.toDateString() ===
        new Date(now.setDate(now.getDate() - 1)).toDateString();

    if (isToday) {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else if (isYesterday) {
        return (
            "Yesterday, " +
            date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
    } else {
        return (
            date.toLocaleDateString([], { month: "short", day: "numeric" }) +
            ", " +
            date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
    }
};