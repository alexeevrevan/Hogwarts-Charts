export const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null;

  const parts: string[] = dateString.split("-");

  if (parts.length !== 3) return null;

  const [day, month, year] = parts;

  if (!/^\d+$/.test(day) || !/^\d+$/.test(month) || !/^\d+$/.test(year)) {
    return null;
  }

  const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));

  return !isNaN(parsedDate.getTime()) ? parsedDate : null;
};

export const isDateInRange = (
  date: string | Date,
  startDate: string | Date,
  endDate: string | Date
): boolean => {
  if (!date) return false;

  const dateToCheck = date instanceof Date ? date : parseDate(date);

  const start = startDate instanceof Date ? startDate : new Date(startDate);

  const end = endDate instanceof Date ? endDate : new Date(endDate);

  if (!dateToCheck) return false;

  const normalizedDateToCheck = new Date(
    dateToCheck.getFullYear(),
    dateToCheck.getMonth(),
    dateToCheck.getDate()
  );

  const normalizedStart = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );

  const normalizedEnd = new Date(
    end.getFullYear(),
    end.getMonth(),
    end.getDate()
  );

  return (
    normalizedDateToCheck >= normalizedStart &&
    normalizedDateToCheck <= normalizedEnd
  );
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
