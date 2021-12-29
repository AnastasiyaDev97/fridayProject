export const convertDateFormat = (dateAsString: string) => {
    let date = new Date(dateAsString)
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
}