import React, { useState } from "react";
import { getDataFromQueryParam } from "../../utils/getDataFromQueryParam";

const CashbackFilter = ({ onToggle }) => {
  const cashbackFromParams = getDataFromQueryParam("cashback");
  const [cashbackEnabled, setCashbackEnabled] = useState(
    cashbackFromParams === "true"
  );

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setCashbackEnabled(checked);
    onToggle(checked);
  };

  return (
    <div className="cashback-filter flex items-center space-x-2 gap-2 px-4">
      <input
        type="checkbox"
        id="cashbackEnabled"
        checked={cashbackEnabled}
        onChange={handleCheckboxChange}
        className="mr-2"
      />
      <label htmlFor="cashbackEnabled" className="text-sm">
        Cashback Enabled
      </label>
    </div>
  );
};

export default CashbackFilter;
