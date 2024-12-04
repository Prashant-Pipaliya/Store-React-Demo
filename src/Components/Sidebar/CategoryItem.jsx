import React from "react";

const CategoryItem = ({ category, isActive, onClick }) => {
  return (
    <li className="px-4">
      <button
        onClick={onClick}
        className={`block w-full text-left p-2 rounded-lg ${
          isActive ? "bg-slate-400 text-white" : "bg-slate-100"
        }`}
      >
        {category.name}
      </button>
    </li>
  );
};

export default CategoryItem;
