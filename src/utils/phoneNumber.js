export function getInputNumbers(number) {
    return number.replace(/\D/g, "")
}

export function deleteChapters(phone) {
    const numbers = phone.replace(/\D/g, "")
    if (numbers[0] === 7) {
        return "8" + numbers.slice(1);
    }
    
    return numbers;
}

export function formatNumber(inputNumbers) {
    if (inputNumbers.length === 0) {
        return ""
    }
    if (inputNumbers.length > 0 && inputNumbers[0] === "+") {
        return inputNumbers
    }
    if (!["7", "8"].includes(inputNumbers[0])){
        return "+" + inputNumbers;
    }

    let resPhone = "+7" + " "
    if (inputNumbers.length > 1) {
        resPhone += "(" + inputNumbers.substring(1, 4);
    } 
    if (inputNumbers.length >= 5) {
        resPhone += ")" + " " + inputNumbers.substring(4, 7);
    }
    if (inputNumbers.length >= 8) {
        resPhone += "-" + inputNumbers.substring(7, 9);
    } 
    if (inputNumbers.length >= 10) {
        resPhone += "-" + inputNumbers.substring(9, 11);
    }

    return resPhone;
}

export function getPhoneNumber(phoneNumber) {
    let inputNumbers = getInputNumbers(phoneNumber);
    return formatNumber(inputNumbers);
}

export function changePhoneNumber(phoneNumber, e) {
    return getPhoneNumber(phoneNumber);
}