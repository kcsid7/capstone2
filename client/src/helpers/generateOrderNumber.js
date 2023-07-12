import { v4 as uuid } from "uuid";




function generateOrderNumber() {
   
    const today = new Date();
    const uId = uuid().split("-");
    let oTime = `${`${today.getHours()}`.padStart(2, 0)}${`${today.getMinutes()}`.padStart(2, 0)}`
    let oDate = `${`${today.getFullYear()}`.slice(2)}${`${today.getMonth()}`.padStart(2, 0)}${`${today.getDate()}`.padStart(2, 0)}`

    // Order Number: ****YYMMDD-****HHMM**
    // * represents a random character generated from UUID
    // YYMMDD - Date of Order | HHMM - Time of Order

    const oNum = `${uId[2]}${oDate}-${uId[1]}${oTime}${uId[3].slice(2)}`.toUpperCase();
    return oNum;

}

export default generateOrderNumber;