import { Team, Story } from "./index"

export interface Game {
  title: string;
  description: string;
  owner: string;
  team: Team;
  cards: Array<String>;
  stories: Array<Story>;
}
