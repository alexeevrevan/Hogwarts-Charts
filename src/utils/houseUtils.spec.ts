import { getHouseRussianName, getHouseColor } from "./houseUtils";
import { HOUSES } from "../constants/houses.constant";
import type { IHouse } from "../models/houses.model";

describe("House Utilities", () => {
  describe("getHouseRussianName", () => {
    test("возвращает русское название существующего факультета", () => {
      const testCases: { input: string; expected: string }[] = [
        { input: "Gryffindor", expected: "Гриффиндор" },
        { input: "Slytherin", expected: "Слизерин" },
        { input: "Hufflepuff", expected: "Пуффендуй" },
        { input: "Ravenclaw", expected: "Когтевран" },
      ];

      testCases.forEach(({ input, expected }) => {
        expect(getHouseRussianName(input)).toBe(expected);
      });
    });

    test("возвращает оригинальное название для неизвестного факультета", () => {
      const unknownHouse = "UnknownHouse";
      expect(getHouseRussianName(unknownHouse)).toBe(unknownHouse);
    });

    test("работает с пустой строкой", () => {
      expect(getHouseRussianName("")).toBe("");
    });
  });

  describe("getHouseColor", () => {
    test("возвращает правильный цвет для существующих факультетов", () => {
      const testCases: { input: string; expected: string }[] = [
        { input: "Gryffindor", expected: "#AE0001" },
        { input: "Slytherin", expected: "#2A623D" },
        { input: "Hufflepuff", expected: "#ECB939" },
        { input: "Ravenclaw", expected: "#222F5B" },
      ];

      testCases.forEach(({ input, expected }) => {
        expect(getHouseColor(input)).toBe(expected);
      });
    });

    test("возвращает дефолтный цвет для неизвестного факультета", () => {
      const unknownHouse = "UnknownHouse";
      expect(getHouseColor(unknownHouse)).toBe("#8884d8");
    });

    test("работает с пустой строкой", () => {
      expect(getHouseColor("")).toBe("#8884d8");
    });
  });

  describe("Проверка полноты покрытия HOUSES", () => {
    test("все факультеты имеют русское название", () => {
      Object.values(HOUSES).forEach((house: IHouse) => {
        const russianName = getHouseRussianName(house.name);
        expect(russianName).not.toBe(house.name);
        expect(russianName).toBeTruthy();
      });
    });

    test("все факультеты имеют цвет", () => {
      Object.values(HOUSES).forEach((house: IHouse) => {
        const color = getHouseColor(house.name);
        expect(color).not.toBe("#8884d8");
        expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });
    });
  });

  describe("Производительность", () => {
    test("функции выполняются быстро", () => {
      const iterations = 10000;
      const houses = ["Gryffindor", "UnknownHouse", "Slytherin", ""];

      const start1 = performance.now();
      for (let i = 0; i < iterations; i++) {
        houses.forEach((house) => getHouseRussianName(house));
      }
      const end1 = performance.now();

      const start2 = performance.now();
      for (let i = 0; i < iterations; i++) {
        houses.forEach((house) => getHouseColor(house));
      }
      const end2 = performance.now();

      const duration1 = end1 - start1;
      const duration2 = end2 - start2;

      console.log(`getHouseRussianName: ${duration1} ms`);
      console.log(`getHouseColor: ${duration2} ms`);

      expect(duration1).toBeLessThan(1000);
      expect(duration2).toBeLessThan(1000);
    });
  });
});
