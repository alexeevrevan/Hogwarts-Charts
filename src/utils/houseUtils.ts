import { HOUSES } from "../constants/houses.constant";
import type { IHouse } from "../models/houses.model";

export const getHouseRussianName = (house: string) => {
  const foundHouse = Object.values(HOUSES).find(
    (h: IHouse) => h.name === house
  );

  return foundHouse ? foundHouse.russianName : house;
};

export const getHouseColor = (house: string) => {
  const foundHouse = Object.values(HOUSES).find(
    (h: IHouse) => h.name === house
  );

  return foundHouse ? foundHouse.color : "#8884d8";
};
