import React, { useState, useEffect } from "react";
import { getDataFromQueryParam } from "../../utils/getDataFromQueryParam";

const StoreSort = ({ onSortChange }) => {
  // Get the sort option from the query params
  const sortByFromParams = getDataFromQueryParam("sortBy");

  const [selectedSort, setSelectedSort] = useState(sortByFromParams || "");

  useEffect(() => {
    setSelectedSort(sortByFromParams || "");
  }, [sortByFromParams]);

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    setSelectedSort(sortBy);
    onSortChange(sortBy);
  };

  return (
    <div className="store-sort px-4">
      <select
        value={selectedSort}
        onChange={handleSortChange}
        className="px-2 py-1 border rounded"
      >
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="featured">Featured</option>
        <option value="popularity">Popularity</option>
        <option value="cashback">Cashback</option>
      </select>
    </div>
  );
};

export default StoreSort;
