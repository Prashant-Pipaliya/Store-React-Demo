import { useState } from "react";

export const useBookmarkStore = () => {
  const [bookmarkedStores, setBookmarkedStores] = useState(
    JSON.parse(localStorage.getItem("bookmarkedStores")) || []
  );

  const addToBookmark = (store) => {
    const updatedBookmarks = [...bookmarkedStores, store];
    setBookmarkedStores(updatedBookmarks);
    localStorage.setItem("bookmarkedStores", JSON.stringify(updatedBookmarks));
  };

  const removeFromBookmark = (storeId) => {
    const updatedBookmarks = bookmarkedStores.filter(
      (store) => store.id !== storeId
    );
    setBookmarkedStores(updatedBookmarks);
    localStorage.setItem("bookmarkedStores", JSON.stringify(updatedBookmarks));
  };

  const isBookmarked = (storeId) => {
    return bookmarkedStores.some((store) => store.id === storeId);
  };

  return {
    bookmarkedStores,
    addToBookmark,
    removeFromBookmark,
    isBookmarked,
  };
};
