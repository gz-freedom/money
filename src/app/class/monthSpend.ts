import DaySpend from "./daySpend";

export default class MonthSpend {
    year: Number;
    month: Number;
    days: Number;
    total: Number;
    currentTotal: Number;
    dayTotal: Number;
    monthNote: String;
    dayExpenditure: DaySpend[];
}