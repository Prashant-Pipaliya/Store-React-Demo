import React, { useState, useEffect } from "react";
import { useFetchStores } from "../../hooks/useFetchStores";
import { StoreCard } from "./";
import InfiniteScroll from "react-infinite-scroll-component";
import Pagination from "../Pagination/Pagination";

const NoDataFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full pt-4">
      <p className="text-xl text-gray-600">No Data Found</p>
    </div>
  );
};

const StoreList = ({
  selectedCategory,
  selectedAlphabet,
  cashbackEnabled,
  isPromoted,
  isSharable,
  status,
  sortBy,
  isPaginated = true,
  searchTerm,
}) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [storesList, setStoresList] = useState([]);
  const { data, isLoading, isError } = useFetchStores({
    page,
    limit,
    category: selectedCategory,
    name_like: selectedAlphabet
      ? `^${selectedAlphabet}`
      : searchTerm
      ? searchTerm
      : undefined,
    cashback_enabled: cashbackEnabled ? 1 : 0,
    is_promoted: isPromoted ? 1 : 0,
    is_sharable: isSharable ? 1 : 0,
    status,
    sortBy,
  });

  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const totalPages = data ? Math.ceil(data.totalCount / limit) : 1;
  const hasNextPage = page < totalPages;

  const loadMoreStores = () => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsFetchingNextPage(true);
      if (page > 1) {
        setTimeout(() => {
          setPage((prevPage) => prevPage + 1);
        }, 1500);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    if (
      selectedCategory ||
      selectedAlphabet ||
      isPromoted ||
      isSharable ||
      status ||
      sortBy ||
      searchTerm
    ) {
      setPage(1);
      setStoresList([]);
    }
  }, [
    selectedCategory,
    selectedAlphabet,
    isPromoted,
    isSharable,
    status,
    sortBy,
    searchTerm,
  ]);

  useEffect(() => {
    if (data?.stores && data?.stores.length > 0) {
      if (isPaginated) {
        if (page === 1) {
          setStoresList(data.stores);
        } else {
          setStoresList((prevStores) => [...prevStores, ...data.stores]);
        }
      } else {
        setStoresList((prevStores) => [...prevStores, ...data.stores]);
      }
      setIsFetchingNextPage(false);
    }
  }, [data, page, isPaginated]);

  if (isLoading && page === 1) return <p>Loading stores...</p>;
  if (isError) return <p>Failed to load stores.</p>;

  return (
    <div>
      {isPaginated && (
        <Pagination
          page={page}
          totalCount={data?.totalCount}
          onPageChange={setPage}
          limit={limit}
        />
      )}

      <InfiniteScroll
        dataLength={storesList.length}
        next={loadMoreStores}
        hasMore={hasNextPage}
        loader={
          isFetchingNextPage ? (
            <div className="flex justify-center items-center py-4">
              <svg
                className="animate-spin h-8 w-8 border-t-4 border-blue-500 border-solid rounded-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                style={{ animationDuration: "1s" }}
              >
                <circle
                  className="opacity-25"
                  cx="25"
                  cy="25"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M25 5a20 20 0 0114.142 34.142l-4.284-4.284A15 15 0 0025 10V5z"
                ></path>
              </svg>
            </div>
          ) : null
        }
        endMessage={<NoDataFound />}
        scrollThreshold={1}
      >
        <div className="store-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {storesList.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default StoreList;
