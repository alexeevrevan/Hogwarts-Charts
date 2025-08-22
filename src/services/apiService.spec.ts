import {
  fetchAllCharacters,
  filterStudents,
  groupStudentsByHouse,
  countStudentsByHouse,
} from "./apiService";
import type { Character } from "../models/character.model";

global.fetch = jest.fn();

const mockCharacters: Character[] = [
  {
    name: "Harry Potter",
    house: "Gryffindor",
    hogwartsStudent: true,
    hogwartsStaff: false,
    dateOfBirth: "31-07-1980",
  },
  {
    name: "Hermione Granger",
    house: "Gryffindor",
    hogwartsStudent: true,
    hogwartsStaff: false,
    dateOfBirth: "19-09-1979",
  },
  {
    name: "Draco Malfoy",
    house: "Slytherin",
    hogwartsStudent: true,
    hogwartsStaff: false,
    dateOfBirth: "05-06-1980",
  },
  {
    name: "Severus Snape",
    house: "Slytherin",
    hogwartsStudent: false,
    hogwartsStaff: true,
    dateOfBirth: "09-01-1960",
  },
];

describe("API Service", () => {
  describe("fetchAllCharacters", () => {
    beforeEach(() => {
      (fetch as jest.Mock).mockClear();
    });

    it("должен успешно загружать данные", async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockCharacters),
      };
      (fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchAllCharacters();

      expect(fetch).toHaveBeenCalledWith(
        "https://hp-api.onrender.com/api/characters"
      );
      expect(result).toEqual(mockCharacters);
    });

    it("должен выбрасывать ошибку при неудачном запросе", async () => {
      const mockResponse = {
        ok: false,
      };
      (fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(fetchAllCharacters()).rejects.toThrow(
        "Ошибка загрузки данных"
      );
    });
  });

  describe("filterStudents", () => {
    it("должен исключать персонажей без даты рождения", () => {
      const startDate = new Date("1980-01-01");
      const endDate = new Date("1980-12-31");

      const filteredStudents = filterStudents(
        [
          ...mockCharacters,
          {
            name: "Test Character",
            hogwartsStudent: true,
            hogwartsStaff: false,
            dateOfBirth: "",
          } as Character,
        ],
        startDate,
        endDate
      );

      expect(filteredStudents.length).toBe(0);
    });
  });

  describe("groupStudentsByHouse", () => {
    it("должен группировать студентов по факультетам", () => {
      const groupedStudents = groupStudentsByHouse(mockCharacters);

      expect(Object.keys(groupedStudents)).toContain("Gryffindor");
      expect(Object.keys(groupedStudents)).toContain("Slytherin");
      expect(groupedStudents["Gryffindor"].length).toBe(2);
      expect(groupedStudents["Slytherin"].length).toBe(2);
    });

    it("должен обрабатывать студентов без факультета", () => {
      const studentsWithoutHouse = [
        ...mockCharacters,
        {
          name: "Test Character",
          hogwartsStudent: true,
          hogwartsStaff: false,
          house: undefined,
        } as Character,
      ];
      const groupedStudents = groupStudentsByHouse(studentsWithoutHouse);

      expect(Object.keys(groupedStudents)).toContain("Unknown");
    });
  });

  describe("countStudentsByHouse", () => {
    it("должен подсчитывать количество студентов по факультетам", () => {
      const houseCounts = countStudentsByHouse(mockCharacters);

      expect(houseCounts["Gryffindor"]).toBe(2);
      expect(houseCounts["Slytherin"]).toBe(2);
    });

    it("должен обрабатывать пустой массив", () => {
      const houseCounts = countStudentsByHouse([]);

      expect(Object.keys(houseCounts).length).toBe(0);
    });
  });
});
