import React from "react";
import { useBookmarkStore } from "../../hooks/useBookmarkStore";
import { useNavigate } from "react-router-dom";
const StoreCard = ({ store }) => {
  const { addToBookmark, removeFromBookmark, isBookmarked } =
    useBookmarkStore();
  const navigate = useNavigate();

  const handleBookmarkClick = () => {
    if (isBookmarked(store.id)) {
      removeFromBookmark(store.id);
    } else {
      addToBookmark(store);
    }
  };

  const renderCashback = () => {
    if (store.cashback_enabled === 0) {
      return <p className="text-sm text-gray-500 p-4">No cashback available</p>;
    }

    const rateType = store.rate_type === "upto" ? "Upto" : "Flat";
    let cashbackAmount = store.cashback_amount.toFixed(2);

    if (store.amount_type === "fixed") {
      cashbackAmount = `$${cashbackAmount}`;
    } else if (store.amount_type === "percent") {
      cashbackAmount = `${cashbackAmount}%`;
    }

    return (
      <p className="text-sm text-gray-500 p-4">
        {rateType} cashback: {cashbackAmount}
      </p>
    );
  };

  const handleCardClick = () => {
    navigate(`/store/${store.id}`, { state: { store } });
  };

  return (
    <div
      className="store-card border rounded-lg shadow cursor-pointer bg-slate-50"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-center gap-2">
        <img
          src={store.logo}
          alt={`${store.name} Logo`}
          className="w-1/2 h-6 object-contain"
        />
        <button
          onClick={(e) => {
            handleBookmarkClick();
            e.stopPropagation();
          }}
          className={`p-2 transition-colors duration-200 ${
            isBookmarked(store.id) ? "text-red-500" : "text-gray-500"
          }`}
        >
          <svg
            width="64px"
            height="64px"
            viewBox="-24 -24 72.00 72.00"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke={isBookmarked(store.id) ? "red" : "#000"}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M19.3 5.71002C18.841 5.24601 18.2943 4.87797 17.6917 4.62731C17.0891 4.37666 16.4426 4.2484 15.79 4.25002C15.1373 4.2484 14.4909 4.37666 13.8883 4.62731C13.2857 4.87797 12.739 5.24601 12.28 5.71002L12 6.00002L11.72 5.72001C10.7917 4.79182 9.53273 4.27037 8.22 4.27037C6.90726 4.27037 5.64829 4.79182 4.72 5.72001C3.80386 6.65466 3.29071 7.91125 3.29071 9.22002C3.29071 10.5288 3.80386 11.7854 4.72 12.72L11.49 19.51C11.6306 19.6505 11.8212 19.7294 12.02 19.7294C12.2187 19.7294 12.4094 19.6505 12.55 19.51L19.32 12.72C20.2365 11.7823 20.7479 10.5221 20.7442 9.21092C20.7405 7.89973 20.2218 6.64248 19.3 5.71002Z"
                fill={isBookmarked(store.id) ? "red" : "white"}
              ></path>
            </g>
          </svg>
        </button>
      </div>
      <h3 className="text-lg font-semibold p-4">{store.name}</h3>
      <p className="text-sm text-gray-500 p-4">{store.description}</p>
      {renderCashback()}
    </div>
  );
};

export default StoreCard;
