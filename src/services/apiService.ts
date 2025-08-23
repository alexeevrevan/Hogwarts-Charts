import { apiConfig } from "../config/apiConfig";
import type { ICharacter } from "../models/character.model";
import { parseDate, isDateInRange } from "../utils/dateUtils";

const API_URL: string = `${apiConfig.baseUrl}${apiConfig.endpoints.characters}`;

export const fetchAllCharacters = async (): Promise<ICharacter[]> => {
  try {
    const response: Response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Ошибка загрузки данных");
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    throw error;
  }
};

export const filterStudents = (
  characters: ICharacter[],
  startDate: Date,
  endDate: Date
): ICharacter[] => {
  return characters.filter((character: ICharacter) => {
    if (!character.hogwartsStudent && !character.hogwartsStaff) {
      return false;
    }

    if (!character.dateOfBirth) {
      return false;
    }

    const birthDate = parseDate(character.dateOfBirth);
    if (!birthDate) {
      return false;
    }

    return isDateInRange(character.dateOfBirth, startDate, endDate);
  });
};

export const groupStudentsByHouse = (
  students: ICharacter[]
): Record<string, ICharacter[]> => {
  return students.reduce<Record<string, ICharacter[]>>((acc, student) => {
    const house = student.house || "Unknown";

    if (!acc[house]) {
      acc[house] = [];
    }

    acc[house].push(student);

    return acc;
  }, {});
};

export const countStudentsByHouse = (
  students: ICharacter[]
): Record<string, number> => {
  const groupedStudents = groupStudentsByHouse(students);

  return Object.keys(groupedStudents).reduce<Record<string, number>>(
    (acc, house) => {
      acc[house] = groupedStudents[house].length;
      return acc;
    },
    {}
  );
};
