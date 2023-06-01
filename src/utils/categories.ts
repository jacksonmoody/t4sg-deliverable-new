export const categories = [
  { id: 0, name: "Default" },
  { id: 1, name: "Startup" },
  { id: 2, name: "Nonprofit" },
  { id: 3, name: "Misc" },
];

export function getCategory(category_id: number | undefined) {
  return categories.find((x) => x.id === category_id);
}

export interface Entry {
  name: string;
  link: string;
  description: string;
  user: string;
  category: number;
  user_id: string;
  id?: string;
}
