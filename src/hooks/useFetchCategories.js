import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCategories = async () => {
  const { data } = await axios.get("http://localhost:3001/categories");
  return data;
};

export const useFetchCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
