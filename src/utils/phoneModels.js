const allPhoneModels = [
    "Sony Xperia 5 III",
    "Redmi Note 9T",
    "realme Narzo 50A",
    "Samsung Galaxy S22 Ultra",
    "realme GT NEO2",
]

export function getPhoneModels(phoneModel) {
    const recomendedPhoneModels = allPhoneModels.filter(item => item.toLowerCase().startsWith(phoneModel.toLowerCase()))

    return recomendedPhoneModels;
}
