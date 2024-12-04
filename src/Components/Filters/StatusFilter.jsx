import React, { useState, useEffect } from "react";
import { getDataFromQueryParam } from "../../utils/getDataFromQueryParam";

const StatusFilter = ({ onSelect }) => {
  const statuses = ["publish", "draft", "trash"];
  const statusFromParams = getDataFromQueryParam("status");
  const [selectedStatus, setSelectedStatus] = useState(statusFromParams || "");

  useEffect(() => {
    setSelectedStatus(statusFromParams || "");
  }, [statusFromParams]);

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    onSelect(status);
  };

  return (
    <div className="status-filter px-4">
      <select
        value={selectedStatus}
        onChange={handleStatusChange}
        className="px-2 py-1 border rounded"
      >
        <option value="">Select Status</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusFilter;
