export interface StdResponse<T> {
  code: number;
  msg: string;
  data: T;
}

export interface ICategory {
  id: number;
  name: string;
  description: string | null;
  image: string;
  slug: string;
  children: ICategory[] | null;
  circle_icon: string;
  disable_shipping: number;
}

export interface ICategoryChild {
  id: number;
  name: string;
  description: string | null;
  slug: string;
  parent: number | null;
  list: boolean;
  type: null;
  value: string;
  other_value: string | null;
  options: {
    id: number;
    name: string;
    slug: string;
    parent: number;
    child: boolean;
  }[];
}
