export type AutocompleteDataType = {
  id: string | number;
  name: string;
  children?: Pick<AutocompleteDataType, "id" | "name">[];
};
