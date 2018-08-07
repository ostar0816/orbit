export const formatDate = (timestamp: number, timeZone?: string) => {
    const d = new Date(timestamp * 1000);
    return d.toLocaleDateString("en-US", { timeZone });
};
export const formatTime = (timestamp: number, timeZone?: string) => {
    const d = new Date(timestamp * 1000);
    return d.toLocaleTimeString("en-US", { timeZone });
};
