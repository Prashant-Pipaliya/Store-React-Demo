import React, { useState } from "react";
import { getDataFromQueryParam } from "../../utils/getDataFromQueryParam";

const IsSharableFilter = ({ onToggle }) => {
  const sharableFromParams = getDataFromQueryParam("sharable");
  const [isSharable, setIsSharable] = useState(sharableFromParams === "true");

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsSharable(checked);
    onToggle(checked);
  };

  return (
    <div className="sharable-filter flex items-center space-x-2 gap-2 px-4">
      <input
        type="checkbox"
        id="isSharable"
        checked={isSharable}
        onChange={handleCheckboxChange}
        className="mr-2"
      />
      <label htmlFor="isSharable" className="text-sm">
        Sharable Stores
      </label>
    </div>
  );
};

export default IsSharableFilter;
