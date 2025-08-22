import type { IHouse } from "../models/houses.model";

export const HOUSES: IHouse[] = [
  {
    key: "GRYFFINDOR",
    name: "Gryffindor",
    russianName: "Гриффиндор",
    color: "#AE0001",
  },
  {
    key: "SLYTHERIN",
    name: "Slytherin",
    russianName: "Слизерин",
    color: "#2A623D",
  },
  {
    key: "HUFFLEPUFF",
    name: "Hufflepuff",
    russianName: "Пуффендуй",
    color: "#ECB939",
  },
  {
    key: "RAVENCLAW",
    name: "Ravenclaw",
    russianName: "Когтевран",
    color: "#222F5B",
  },
];

export const HOUSE_NAMES = HOUSES.map((house: IHouse) => house.name);
