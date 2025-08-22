import type { Character } from "../models/character.model";
import { parseDate, isDateInRange } from "../utils/dateUtils";

const API_URL: string = "https://hp-api.onrender.com/api/characters";

export const fetchAllCharacters = async (): Promise<Character[]> => {
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
  characters: Character[],
  startDate: Date,
  endDate: Date
): Character[] => {
  return characters.filter((character: Character) => {
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
  students: Character[]
): Record<string, Character[]> => {
  return students.reduce<Record<string, Character[]>>((acc, student) => {
    const house = student.house || "Unknown";

    if (!acc[house]) {
      acc[house] = [];
    }

    acc[house].push(student);

    return acc;
  }, {});
};

export const countStudentsByHouse = (
  students: Character[]
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
