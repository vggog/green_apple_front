export function isValidPhone(phone) {
    const res = phone.match("(\\s*)?(\\+)?([- _():=+]?\\d[- _():=+]?){10,14}(\\s*)?")
    return res;
}

export function isValidPassword(password) {
    return password.length >= 8;
}
