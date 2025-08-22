import { useState, useEffect } from "react";
import { HOUSES } from "../constants/houses.constant";
import type { Character } from "../models/character.model";
import { fetchAllCharacters, filterStudents } from "../services/apiService";

interface ChartData {
  name: string;
  count: number;
  color: string;
  percentage: number;
}

export const useHogwartsData = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Character[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllCharacters();
        setCharacters(data);
        setFilteredStudents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleFilter = () => {
    if (!startDate || !endDate) {
      alert("Пожалуйста, введите обе даты");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      alert('Дата "с" должна быть раньше даты "по"');
      return;
    }

    const filtered = filterStudents(characters, start, end);
    setFilteredStudents(filtered);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setFilteredStudents(characters);
  };

  const prepareChartData = (): ChartData[] => {
    const totalStudents = filteredStudents.filter(
      (s) => s.hogwartsStudent
    ).length;

    return Object.values(HOUSES)
      .map((house) => {
        const count = filteredStudents.filter(
          (student) => student.house === house.name && student.hogwartsStudent
        ).length;

        const percentage =
          totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;

        return {
          name: house.russianName,
          count: count,
          color: house.color,
          percentage: percentage,
        };
      })
      .filter((item) => item.count > 0);
  };

  return {
    characters,
    filteredStudents,
    startDate,
    endDate,
    loading,
    error,
    setStartDate,
    setEndDate,
    handleFilter,
    handleReset,
    prepareChartData,
    totalStudents: filteredStudents.filter((s) => s.hogwartsStudent).length,
    totalStaff: filteredStudents.filter((s) => s.hogwartsStaff).length,
  };
};
