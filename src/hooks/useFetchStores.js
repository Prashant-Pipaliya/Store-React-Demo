import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchStores = async ({
  page = 1,
  limit = 10,
  category,
  name_like,
  cashback_enabled,
  is_promoted,
  is_sharable,
  status,
  sortBy,
  searchTerm,
}) => {
  const params = { _page: page, _limit: limit };

  if (category) params.cats = category;
  if (name_like) params.name_like = name_like;
  if (cashback_enabled) params.cashback_enabled = cashback_enabled ? 1 : 0;
  if (is_promoted) params.is_promoted = is_promoted ? 1 : 0;
  if (is_sharable) params.is_sharable = is_sharable ? 1 : 0;
  if (status) params.status = status;
  if (searchTerm) {
    params.name_like = searchTerm;
  } else if (name_like) {
    params.name_like = name_like;
  }

  if (sortBy) {
    if (sortBy === "cashback") {
      params._sort = "amount_type,cashback_amount";
      params._order = "asc,desc";
    } else {
      params._sort = sortBy;
      params._order = "desc";
    }
  }

  const response = await axios.get("http://localhost:3001/stores", { params });
  const totalCount = parseInt(response.headers["x-total-count"], 10);

  return {
    data: response.data,
    totalCount,
  };
};

export const useFetchStores = ({
  page,
  limit,
  category,
  name_like,
  cashback_enabled,
  is_promoted,
  is_sharable,
  status,
  sortBy,
  searchTerm,
}) => {
  return useQuery({
    queryKey: [
      "stores",
      page,
      limit,
      category,
      name_like,
      cashback_enabled,
      is_promoted,
      is_sharable,
      status,
      sortBy,
      searchTerm,
    ],
    queryFn: () =>
      fetchStores({
        page,
        limit,
        category,
        name_like,
        cashback_enabled,
        is_promoted,
        is_sharable,
        status,
        sortBy,
        searchTerm,
      }),
    keepPreviousData: true,
    select: (data) => ({
      stores: data.data,
      totalCount: data.totalCount,
    }),
  });
};
