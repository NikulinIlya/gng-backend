export const daysOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
export const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
];
export const getDaysInMonth = date =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

export const isOffsetDay = (day, observedDate = new Date()) => {
    const observedYear = observedDate.getFullYear();
    const observedMonth = observedDate.getMonth();
    const firstDayOfObservedMonth = new Date(observedYear, observedMonth, 1);
    const lastDayOfObservedMonth = new Date(observedYear, observedMonth + 1, 0);

    return day < firstDayOfObservedMonth || day > lastDayOfObservedMonth;
};

export const getDayOfWeek = date => {
    const dayOfWeek = date.getDay();
    //'monday is first day of week' trick
    return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
};

export const areEqual = (d1, d2) => {
    if (!d1 || !d2) return false;
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
};
export const getCalendarData = (date = new Date()) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const DAYS_IN_WEEK = 7;
    const daysInMonth = getDaysInMonth(date);
    const monthStartsOn = getDayOfWeek(new Date(year, month, 1));
    const weeksInMonth = Math.ceil(
        (daysInMonth + monthStartsOn) / DAYS_IN_WEEK
    );
    let day = 1;

    // console.log('daysInMonth',daysInMonth)
    // console.log('monthStartsOn',monthStartsOn)
    // console.log('weeksInMonth',weeksInMonth)

    const monthData = Array.from({ length: weeksInMonth }).reduce(
        (acc, _, weekIndex) => {
            const week = Array.from({ length: DAYS_IN_WEEK }).map(
                (_, dayIndex) => {
                    if (!weekIndex && dayIndex < monthStartsOn) {
                        return new Date(
                            year,
                            month,
                            (monthStartsOn - dayIndex - 1) * -1
                        );
                    }
                    return new Date(year, month, day++);
                }
            );
            return [...acc, week];
        },
        []
    );
    return monthData;
};

export const getTime = date => {
    if (!date) return "";
    const hours = date.getHours();
    const minutes =
        `${date.getMinutes()}`.length === 1
            ? `0${date.getMinutes()}`
            : date.getMinutes();
    return `${hours}:${minutes}`;
};
