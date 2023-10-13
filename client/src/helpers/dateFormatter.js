export default function dateFormatter(date) {
    const dateObj = new Date(date);
    return `${dateObj.getMonth() + 1}-${dateObj.getDate()}-${dateObj.getFullYear()}`;
} 