import React, { useMemo } from "react";
import { useCsvStore } from "../store/useCsvStore";
import FilterDropdown from "./UI/FilterDropdown";

const DropDownContainer: React.FC = () => {
  // 🔄 Zustand selectors
  const data = useCsvStore((s) => s.data);
  const clearFilters = useCsvStore((s) => s.clearFilters);

  // ✅ Memoized column names (don’t recalculate on each render)
  const columns: string[] = useMemo(() => {
    return data.length > 0 ? Object.keys(data[0]) : [];
  }, [data]);

  // 💡 Optional: Skip rendering if no columns (avoid empty grid)
  if (!columns.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 my-10">
      {columns.map((col) => (
        <FilterDropdown key={col} column={col} />
      ))}

      {/* 🚀 Show clear button only if data exists */}
      {data.length > 1 && (
        <button
          onClick={clearFilters}
          className="w-fit px-3 py-2 text-gray-600 hover:bg-blue-500 hover:text-white rounded-md transition-colors duration-300 ease-in-out"
        >
          Clear Filter
        </button>
      )}
    </div>
  );
};

export default DropDownContainer;
