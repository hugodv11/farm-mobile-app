import SeasonsEnum from "./seasonsEnum";

export default interface Crop {
  id: number;
  name: string;
  description: string;
  season: SeasonsEnum;
}
