/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CategoryList } from "../Components/Sidebar";
import { StoreList } from "../Components/StoreCard";
import AlphabetFilter from "../Components/Filters/AlphabetFilter";
import CashbackFilter from "../Components/Filters/CashbackFilter";
import IsPromotedFilter from "../Components/Filters/IsPromotedFilter";
import IsSharableFilter from "../Components/Filters/IsSharableFilter";
import StatusFilter from "../Components/Filters/StatusFilter";
import StoreSort from "../Components/Sort/StoreSort";

const StoresPage = ({ searchTerm }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAlphabet, setSelectedAlphabet] = useState(null);
  const [cashbackEnabled, setCashbackEnabled] = useState(false);
  const [isPromoted, setIsPromoted] = useState(false);
  const [isSharable, setIsSharable] = useState(false);
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateQueryParams = () => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedAlphabet) params.set("alphabet", selectedAlphabet);
    if (cashbackEnabled) params.set("cashback", "true");
    if (isPromoted) params.set("promoted", "true");
    if (isSharable) params.set("sharable", "true");
    if (status) params.set("status", status);
    if (sortBy) params.set("sortBy", sortBy);
    if (searchTerm) params.set("search", searchTerm);

    navigate({ search: params.toString() });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelectedCategory(params.get("category"));
    setSelectedAlphabet(params.get("alphabet"));
    setCashbackEnabled(params.get("cashback") === "true");
    setIsPromoted(params.get("promoted") === "true");
    setIsSharable(params.get("sharable") === "true");
    setStatus(params.get("status") || "");
    setSortBy(params.get("sortBy") || "");
  }, [location.search]);

  useEffect(() => {
    updateQueryParams();
  }, [
    selectedCategory,
    selectedAlphabet,
    cashbackEnabled,
    isPromoted,
    isSharable,
    status,
    sortBy,
    searchTerm,
  ]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleAlphabetSelect = (alphabet) => {
    setSelectedAlphabet(alphabet);
  };

  const handleStatusSelect = (statusValue) => {
    setStatus(statusValue);
  };

  const handleSortChange = (selectedSortBy) => {
    setSortBy(selectedSortBy);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <CategoryList onCategorySelect={handleCategorySelect} />
      <main className="flex-1 sm:py-8 py-0 px-4">
        <div className="flex flex-row-reverse justify-between items-center mb-4">
          <button
            className="p-2 bg-blue-500 text-white rounded flex items-center gap-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <svg
              className="mr-2 size-5 flex-none text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              data-slot="icon"
            >
              <path
                fill="white"
                fillRule="evenodd"
                d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z"
                clipRule="evenodd"
              />
            </svg>
            Filters
          </button>
        </div>

        {isFilterOpen && (
          <div className="space-y-4 mb-4 p-4 border rounded bg-white">
            <div className="mb-4">
              <AlphabetFilter onSelect={handleAlphabetSelect} />
            </div>
            <div className="flex mb-4">
              <StatusFilter onSelect={handleStatusSelect} />
              <StoreSort onSortChange={handleSortChange} />
            </div>
            <div className="mb-4">
              <CashbackFilter onToggle={setCashbackEnabled} />
            </div>
            <div className="mb-4">
              <IsPromotedFilter onToggle={setIsPromoted} />
            </div>
            <div className="mb-4">
              <IsSharableFilter onToggle={setIsSharable} />
            </div>
          </div>
        )}

        <StoreList
          selectedCategory={selectedCategory}
          selectedAlphabet={selectedAlphabet}
          cashbackEnabled={cashbackEnabled}
          isPromoted={isPromoted}
          isSharable={isSharable}
          status={status}
          sortBy={sortBy}
          searchTerm={searchTerm}
        />
      </main>
    </div>
  );
};

export default StoresPage;
