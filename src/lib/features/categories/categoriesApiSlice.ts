import { ICategory, ICategoryChild, StdResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://staging.mazaady.com/api/v1",
    prepareHeaders: (headers) => {
      const token = "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16";
      headers.set("private-key", `${token}`);
      return headers;
    },
  }),
  reducerPath: "categoriesApi",
  tagTypes: ["Categories", "Properties", "Options"],
  endpoints: (build) => ({
    getCategories: build.query<
      StdResponse<{
        categories: ICategory[];
      }>,
      any
    >({
      query: () => `get_all_cats`,
      providesTags: (result, error, id) => [{ type: "Categories", id }],
    }),
    getProperties: build.query<StdResponse<ICategoryChild[]>, number>({
      query: (categoryId) => `properties?cat=${categoryId}`,
      providesTags: (result, error, id) => [{ type: "Properties", id }],
    }),
    getOptions: build.query<StdResponse<ICategoryChild[]>, number>({
      query: (optionId) => `get-options-child/${optionId}`,
      providesTags: (result, error, id) => [{ type: "Options", id }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetPropertiesQuery,
  useGetOptionsQuery,
} = categoriesApiSlice;
