import React, { useState } from "react";
import { getDataFromQueryParam } from "../../utils/getDataFromQueryParam";

const IsPromotedFilter = ({ onToggle }) => {
  const promotedFromParams = getDataFromQueryParam("promoted");
  const [isPromoted, setIsPromoted] = useState(promotedFromParams === "true");

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsPromoted(checked);
    onToggle(checked);
  };

  return (
    <div className="promoted-filter flex items-center space-x-2 gap-2 px-4">
      <input
        type="checkbox"
        id="isPromoted"
        checked={isPromoted}
        onChange={handleCheckboxChange}
        className="mr-2"
      />
      <label htmlFor="isSharable" className="text-sm">
        Promoted Stores
      </label>
    </div>
  );
};

export default IsPromotedFilter;
