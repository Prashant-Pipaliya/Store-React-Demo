import React, { useState } from "react";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import CategoryItem from "./CategoryItem";
import { getDataFromQueryParam } from "../../utils/getDataFromQueryParam";

const CategoryList = ({ onCategorySelect }) => {
  const { data: categories, isLoading, isError } = useFetchCategories();
  const categoryFromParams = getDataFromQueryParam("category");

  const [activeCategory, setActiveCategory] = useState(
    Number(categoryFromParams) || null
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCategoryClick = (categoryId) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
      onCategorySelect(null);
    } else {
      setActiveCategory(categoryId);
      onCategorySelect(categoryId);
    }
  };

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Failed to load categories.</p>;

  return (
    <div className="p-4">
      <button
        className="md:hidden p-2 bg-slate-950 text-white rounded"
        onClick={toggleSidebar}
      >
        Open Categories
      </button>

      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`fixed right-0 top-16 h-screen overflow-y-auto w-64 bg-white shadow-lg transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } sm:block md:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Categories</h2>
          <button className="text-gray-500 md:hidden" onClick={toggleSidebar}>
            &times;
          </button>
        </div>
        <ul className="space-y-2 p-4">
          {categories?.length > 0 &&
            categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                isActive={activeCategory === category?.id}
                onClick={() => handleCategoryClick(category?.id)}
              />
            ))}
        </ul>
      </div>

      <div className="hidden md:block">
        <div className="sidebar p-4">
          <div className="border-2 rounded-md p-2 bg-slate-50">
            <h2 className="text-lg font-bold mb-4 px-5">Categories</h2>
            <ul className="space-y-2 sticky top-40 h-screen overflow-y-auto">
              {categories?.length > 0 &&
                categories.map((category) => (
                  <CategoryItem
                    key={category.id}
                    category={category}
                    isActive={activeCategory === category?.id}
                    onClick={() => handleCategoryClick(category?.id)}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
