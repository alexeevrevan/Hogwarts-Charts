export const parseDate = (dateString: string) => {
  if (!dateString) return null;

  const parts: string[] = dateString.split("-");

  if (parts.length !== 3) return null;

  return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
};

export const isDateInRange = (
  date: string,
  startDate: string | Date,
  endDate: string | Date
) => {
  if (!date) return false;

  return date >= startDate && date <= endDate;
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("ru-RU");
};
