import React from "react";
import { useLocation } from "react-router-dom";

const StoreDetailPage = () => {
  const location = useLocation();
  const { store } = location.state || {};

  if (!store) {
    return <div className="p-6">Store not found</div>;
  }

  const renderCashback = () => {
    if (!store.cashback_enabled) {
      return <p>No cashback available</p>;
    }

    let cashbackAmount = store.cashback_amount.toFixed(2);

    if (store.amount_type === "fixed") {
      cashbackAmount = `$${cashbackAmount}`;
    } else if (store.amount_type === "percent") {
      cashbackAmount = `${cashbackAmount}%`;
    }

    return (
      <p className="text-lg text-blue-600 font-semibold">
        {store.rate_type} cashback: {cashbackAmount}
      </p>
    );
  };

  return (
    <div className="store-detail border rounded-md p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-800">{store.name}</h1>
      <div className="flex flex-col sm:flex-row items-center mt-6">
        <img
          className="w-40 h-40 sm:w-48 sm:h-48 object-contain shadow-lg rounded-md"
          src={store.logo}
          alt={`${store.name} Logo`}
        />
        <div className="ml-6 mt-4 sm:mt-0">
          <p className="text-xl text-gray-700">{store.description}</p>
          {renderCashback()}
          <a
            href={store.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Visit {store.name}
          </a>
        </div>
      </div>
    </div>
  );
};

export default StoreDetailPage;
