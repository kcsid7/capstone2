export default function getCurrentDateAndTime() {

    const today = new Date();
    return  [
                // Date.getMonth() returns a 0 based index of the months therefore need to add 1
                `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`,
                `${`${today.getHours()}`.padStart(2, 0)}:${`${today.getMinutes()}`.padStart(2, 0)}`
            ] 
}
