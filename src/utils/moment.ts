// moment()
export const today = (): Date => new Date();

// moment().format('YYYY-MM-DD')
type TDateFormat = 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM-DD-YYYY';

export const formatDate = (date: Date, format: TDateFormat): string => {
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, '0');
  const day: string = String(date.getDate()).padStart(2, '0');

  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'MM-DD-YYYY':
      return `${month}-${day}-${year}`;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};
// moment().month(number).format('MM')
export const getFormattedDateWithMonth = (
  month: number,
  format: string,
): string => {
  const date = new Date();
  date.setMonth(month);

  const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const day = date.getDate().toString().padStart(2, '0');

  switch (format) {
    case 'MM':
      return formattedMonth;
    case 'YYYY-MM':
      return `${year}-${formattedMonth}`;
    case 'DD/MM/YYYY':
      return `${day}/${formattedMonth}/${year}`;
    case 'YYYY/MM/DD':
      return `${year}/${formattedMonth}/${day}`;
    default:
      throw new Error('Unsupported format');
  }
};
// moment().month(number).format('YYYY')
export const getFormattedDateWithYear = (
  year: number,
  format: string,
): string => {
  const date = new Date();
  date.setFullYear(year);

  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const formattedYear = date.getFullYear().toString();

  // Xử lý định dạng tùy thuộc vào format truyền vào
  switch (format) {
    case 'YYYY':
      return formattedYear;
    case 'YYYY-MM':
      return `${formattedYear}-${month}`;
    case 'YYYY-MM-DD':
      return `${formattedYear}-${month}-${day}`;
    case 'MM/YYYY':
      return `${month}/${formattedYear}`;
    default:
      throw new Error('Unsupported format');
  }
};

// moment('2024-07-30').add(1, 'days')
export const addDays = (date: Date, days: number): Date => {
  const result: Date = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// moment('2024-07-30').subtract(1, 'months')
export const subtractMonths = (date: Date, months: number): Date => {
  const result: Date = new Date(date);
  result.setMonth(result.getMonth() - months);
  return result;
};

// moment().add(10, 'years').toDate()
export const addYearsToDate = (yearsToAdd: number): Date => {
  const currentDate = new Date();
  const newDate = new Date(currentDate);
  newDate.setFullYear(currentDate.getFullYear() + yearsToAdd);
  return newDate;
};

// moment('2024-07-30').startOf('month')
export const startOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1);

// moment('2024-07-30').endOf('month')
export const endOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

// moment('2024-07-30').diff(moment('2024-06-30'), 'days')
export const diffInDays = (date1: Date, date2: Date): number => {
  const timeDiff: number = date1.getTime() - date2.getTime();
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
};

// moment('2024-07-30').isBefore(moment('2024-07-31'))
export const isBefore = (date1: Date, date2: Date): boolean => date1 < date2;

// moment('2024-07-30').isAfter(moment('2024-07-29'))
export const isAfter = (date1: Date, date2: Date): boolean => date1 > date2;

// moment('2024-07-30').isSame(moment('2024-07-30'))
export const isSame = (date1: Date, date2: Date): boolean =>
  date1.getTime() === date2.getTime();

// moment().month(),
export const getCurrentMonth = (): number => {
  const now: Date = new Date();
  return now.getMonth();
};

// moment().month(month)
export const setMonth = (date: Date, month: number): Date => {
  const newDate: Date = new Date(date);
  newDate.setMonth(month);
  return newDate;
};

// moment().year()
export const getCurrentYear = (): number => {
  const now: Date = new Date();
  return now.getFullYear();
};

// moment().year(year)
export const setYear = (date: Date, year: number): Date => {
  const newDate: Date = new Date(date);
  newDate.setFullYear(year);
  return newDate;
};

export const getCurrentQuarter = (): number => {
  const currentMonth = new Date().getMonth(); // getMonth() is 0-based
  return Math.floor(currentMonth / 3) + 1;
};

// month(string date)
export const parseDateString = (
  dateString: string,
  format: string,
): Date | null => {
  let regex;

  switch (format) {
    case 'YYYY-MM-DD':
      regex = /^\d{4}-\d{2}-\d{2}$/;
      break;
    case 'MM/DD/YYYY':
      regex = /^\d{2}\/\d{2}\/\d{4}$/;
      break;
    default:
      throw new Error('Unsupported format');
  }

  if (!regex.test(dateString)) {
    return null;
  }

  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

// moment().daysInMonth()
export const daysInMonth = (year: number, month: number): number => {
  const date = new Date(year, month, 0);
  return date.getDate();
};

export const getDateInformation = (
  date: Date,
): {
  day: number;
  month: number;
  year: number;
} => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return {day, month, year};
};

export const isDateAfter = (date1: Date, date2: Date): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  // Calculate the device's timezone offset in milliseconds
  const timezoneOffset = d1.getTimezoneOffset() * 60000; // Offset in milliseconds

  // Adjust the date to the device's local time
  const d1GMT = new Date(d1.getTime() - timezoneOffset);
  const d2GMT = new Date(d2.getTime() - timezoneOffset);

  const dayDiff = Math.ceil(
    (d1GMT.getTime() - d2GMT.getTime()) / (1000 * 60 * 60 * 24),
  );

  return dayDiff >= 0;
};

export const isDateBefore = (date1: Date, date2: Date): boolean => {
  // Adjust the date to the device's local time
  const d1GMT = new Date(date1.getTime());
  const d2GMT = new Date(date2.getTime());

  const dayDiff = Math.ceil(
    (d1GMT.getTime() - d2GMT.getTime()) / (1000 * 60 * 60 * 24),
  );

  return dayDiff < 0;
};

export const isDateSame = (date1: Date, date2: Date): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  // Calculate the device's timezone offset in milliseconds
  const timezoneOffset = d1.getTimezoneOffset() * 60000; // Offset in milliseconds

  // Adjust the date to the device's local time
  const d1GMT = new Date(d1.getTime() - timezoneOffset);
  const d2GMT = new Date(d2.getTime() - timezoneOffset);

  const dayDiff = Math.ceil(
    (d1GMT.getTime() - d2GMT.getTime()) / (1000 * 60 * 60 * 24),
  );

  return dayDiff === 0;
};
