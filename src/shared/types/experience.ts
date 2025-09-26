import { icons } from "../lib/data/icons";

export interface Experience {
  id: string;
  date: string;
  title: string;
  company: string;
  description: string;
  iconKey: keyof typeof icons;
}