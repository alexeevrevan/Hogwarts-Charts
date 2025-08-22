import type { IHouse } from "../models/houses.model";
import { HOUSES, HOUSE_NAMES } from "./houses.constant";

describe("Houses Constants", () => {
  test("HOUSES массив содержит 4 факультета", () => {
    expect(HOUSES).toHaveLength(4);
  });

  test("Каждый факультет имеет правильную структуру", () => {
    HOUSES.forEach((house: IHouse) => {
      expect(house).toHaveProperty("key");
      expect(house).toHaveProperty("name");
      expect(house).toHaveProperty("russianName");
      expect(house).toHaveProperty("color");
    });
  });

  test("HOUSE_NAMES содержит 4 названия факультетов", () => {
    expect(HOUSE_NAMES).toHaveLength(4);
    expect(HOUSE_NAMES).toEqual([
      "Gryffindor",
      "Slytherin",
      "Hufflepuff",
      "Ravenclaw",
    ]);
  });
});
