"use client";

import React from "react";
import { useState } from "react";
import Autocomplete from "@/components/Autocomplete";
import {
  useGetCategoriesQuery,
  useGetOptionsQuery,
  useGetPropertiesQuery,
} from "@/lib/features/categories/categoriesApiSlice";
import { ICategory, ICategoryChild } from "@/types";
import { useDispatch } from "react-redux";
import { selectData, setData } from "@/lib/features/categories/categoriesSlice";
import { useAppSelector } from "@/lib/hooks";
import Table from "../Table";

const PropertyItem = ({ property }: { property: ICategoryChild }) => {
  const dispatch = useDispatch();

  const [selectedProperty, setSelectedProperty] =
    useState<ICategoryChild | null>(null);

  const { data: optionsData } = useGetOptionsQuery(selectedProperty?.id!, {
    skip: !selectedProperty,
  });

  const handleSetProperty = (val: ICategoryChild) => {
    dispatch(setData({ key: property.name, value: val.name }));
    setSelectedProperty(val);
  };

  return (
    <>
      <Autocomplete
        data={property.options}
        placeholder={property.name}
        onChange={handleSetProperty}
      />
      {optionsData?.data.map((option) => (
        <PropertyItem key={option.id} property={option} />
      ))}
    </>
  );
};

const SubCategoryItems = ({
  selectedSubCategoryId,
}: {
  selectedSubCategoryId: number;
}) => {
  const { data: subCategoriesProperties } = useGetPropertiesQuery(
    selectedSubCategoryId,
    {
      skip: !selectedSubCategoryId,
    }
  );
  const properties = subCategoriesProperties?.data;

  return (
    <>
      {properties?.map((property) => (
        <PropertyItem key={property.id} property={property} />
      ))}
    </>
  );
};

interface HomeProps {}

const Home = ({}: HomeProps) => {
  const dispatch = useDispatch();
  const data = useAppSelector(selectData);

  const [viewData, setViewData] = useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<ICategory | null>(null);

  const { data: categoriesData } = useGetCategoriesQuery({});

  const categories = categoriesData?.data.categories;

  const handleSetCategory = (val: ICategory) => {
    dispatch(setData({ key: "Main Category", value: val.name }));
    setSelectedCategory({
      ...val,
      ...(val.children !== null && val.children.length
        ? {
            children: [
              ...val.children,
              {
                id: 999999999,
                name: "Other",
                children: null,
                circle_icon: "",
                description: null,
                disable_shipping: 0,
                image: "",
                slug: "",
              },
            ],
          }
        : {}),
    });
  };

  const handleSetSubCategory = (val: ICategory) => {
    dispatch(setData({ key: "Sub Category", value: val.name }));
    setSelectedSubCategory(val);
  };

  const handleSubmit = () => setViewData(true);

  return (
    <main className="flex flex-col items-center gap-4 p-24">
      <Autocomplete
        data={categories}
        onChange={handleSetCategory}
        placeholder="Main Category"
      />

      <Autocomplete
        data={selectedCategory?.children ?? []}
        onChange={handleSetSubCategory}
        placeholder="Sub Category"
      />

      {selectedSubCategory && (
        <SubCategoryItems selectedSubCategoryId={selectedSubCategory.id} />
      )}

      {selectedSubCategory?.name === "Other" && (
        <input
          placeholder="Other..."
          className="h-max rounded-lg border-none py-2 pl-3  text-sm leading-5 text-gray-900 focus:outline-none"
        />
      )}
      <button
        className="bg-white text-black px-4 py-2 rounded-lg"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {viewData && (
        <Table
          data={Object.entries(data).map(([key, value]) => ({ key, value }))}
        />
      )}
    </main>
  );
};

export default Home;
