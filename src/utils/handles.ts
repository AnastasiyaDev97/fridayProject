export const convertDateFormat = (dateAsString: string) => {
    let date = new Date(dateAsString)
    return `${addZeroToDate(date.getDate())}.${addZeroToDate(date.getMonth() + 1)}.${date.getFullYear()}`
}

export const addZeroToDate = (date: number) => {
    if (date.toString().length === 1) {
        return `0${date}`
    }
    return date
}