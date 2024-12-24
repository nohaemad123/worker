export const FormatDate = (date: string): string => {
    return `${date['year']}-${date['month']}-${date['day']}T00:00:00Z`;
}