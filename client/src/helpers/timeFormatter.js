// Takes in time in the form of 11:56:00 and returns it as HH:MM AM/PM
export default function timeFormatter(time) {
    let [HH, MM, SS] = time.split(":");
    if (+HH >= 12) {
        if (+HH > 12) {
            HH = +HH - 12
        }
        HH = HH.toString();
        return `${HH}:${MM} PM`
    } else if (HH === "00") {
        HH = "12";
    }
    return `${HH}:${MM} AM`
}   