import { Item } from "./item";

export interface Archive {
  id: number;
  title: string;
  archiveData: Date;
  items?: Item[]; // optional if not always included
};

