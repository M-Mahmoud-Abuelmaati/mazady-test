"use client";

import React from "react";
import { dummyData } from "@/constants/dummyData";
import { AutocompleteDataType } from "@/types";
import { useState } from "react";
import Autocomplete from "@/components/Autocomplete";

interface HomeProps {}

const Home = ({}: HomeProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<AutocompleteDataType>();

  const [selectedSubCategory, setSelectedSubCategory] =
    useState<AutocompleteDataType>();

  const handleSetCategory = (val: AutocompleteDataType) => {
    setSelectedCategory({
      ...val,
      children: [...(val.children ?? []), { id: "100", name: "Other" }],
    });
  };

  const handleSetSubCategory = (val: AutocompleteDataType) => {
    setSelectedSubCategory(val);
  };

  return (
    <main className="flex items-center gap-4 p-24">
      <Autocomplete
        data={dummyData}
        onChange={handleSetCategory}
        placeholder="Main Category"
      />

      <Autocomplete
        data={selectedCategory?.children ?? []}
        onChange={handleSetSubCategory}
        placeholder="Sub Category"
      />

      {selectedSubCategory?.name === "Other" && (
        <input
          placeholder="Other..."
          className="h-max rounded-lg border-none py-2 pl-3  text-sm leading-5 text-gray-900 focus:outline-none"
        />
      )}
    </main>
  );
};

export default Home;
