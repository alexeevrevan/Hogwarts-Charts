import { parseDate, isDateInRange, formatDate } from "./dateUtils";

describe("Date Utilities", () => {
  describe("parseDate", () => {
    test("парсит корректную дату", () => {
      const result = parseDate("31-12-2023");
      expect(result).toBeInstanceOf(Date);
      expect(result?.getFullYear()).toBe(2023);
      expect(result?.getMonth()).toBe(11); // месяцы в JS с 0
      expect(result?.getDate()).toBe(31);
    });

    test("возвращает null для пустой строки", () => {
      const result = parseDate("");
      expect(result).toBeNull();
    });

    test("возвращает null для неполной даты", () => {
      const result = parseDate("31-12");
      expect(result).toBeNull();
    });
  });

  describe("isDateInRange", () => {
    test("возвращает true для даты в диапазоне", () => {
      const result = isDateInRange("15-05-2023", "01-01-2023", "31-12-2023");
      expect(result).toBe(true);
    });

    test("возвращает true для даты на границе диапазона", () => {
      const result = isDateInRange("01-01-2023", "01-01-2023", "31-12-2023");
      expect(result).toBe(true);
    });

    test("возвращает false для пустой даты", () => {
      const result = isDateInRange("", "01-01-2023", "31-12-2023");
      expect(result).toBe(false);
    });
  });

  describe("formatDate", () => {
    test("форматирует дату в русской локали", () => {
      const date = new Date("2023-12-31");
      const result = formatDate(date);
      expect(result).toMatch(/\d{2}\.\d{2}\.\d{4}/); // Формат ДД.ММ.ГГГГ
      expect(result).toBe("31.12.2023");
    });

    test("правильно форматирует даты с разными днями и месяцами", () => {
      const testCases = [
        { input: "2023-01-01", expected: "01.01.2023" },
        { input: "2023-12-31", expected: "31.12.2023" },
        { input: "2024-02-29", expected: "29.02.2024" },
      ];

      testCases.forEach(({ input, expected }) => {
        const date = new Date(input);
        expect(formatDate(date)).toBe(expected);
      });
    });
  });

  describe("Комплексный сценарий", () => {
    test("парсинг, проверка диапазона и форматирование", () => {
      const dateString = "31-12-2023";
      const startDate = "01-01-2023";
      const endDate = "31-12-2023";

      const parsedDate = parseDate(dateString);
      expect(parsedDate).not.toBeNull();

      if (parsedDate) {
        const inRange = isDateInRange(dateString, startDate, endDate);
        expect(inRange).toBe(true);

        const formattedDate = formatDate(parsedDate);
        expect(formattedDate).toBe("31.12.2023");
      }
    });
  });
});
