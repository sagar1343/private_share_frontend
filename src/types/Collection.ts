export enum Color {
  YELLOW = "YELLOW",
  RED = "RED",
  GREEN = "GREEN",
  VIOLET = "VIOLET",
  PINK = "PINK",
  BLUE = "BLUE",
}

export interface ICollection {
  id: number;
  title: string;
  user: number;
  color: Color;
  items_count: number;
  size: string;
  created_at: string;
  updated_at: string;
}
