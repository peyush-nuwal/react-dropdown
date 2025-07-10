import DataTable from "react-data-table-component";
import { useCsvStore } from "../store/useCsvStore";
import React, { useMemo } from "react";

// ✅ Custom styles for the DataTable (tailored to a dark theme)
const customStyles = {
  header: {
    style: {
      backgroundColor: "#0f172a",
      color: "white",
      fontSize: "18px",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#1e293b",
      color: "white",
      borderBottom: "2px solid #334155",
    },
  },
  rows: {
    style: {
      minHeight: "56px",
      fontSize: "15px",
      "&:hover": {
        backgroundColor: "#f1f5f9",
      },
    },
  },
  pagination: {
    style: {
      backgroundColor: "#f8fafc",
      borderTop: "1px solid #e2e8f0",
    },
  },
};

const CustomDataTable = () => {
  // ✅ Get raw CSV data and active filters from CsvStore
  const data = useCsvStore((s) => s.data);
  const filters = useCsvStore((s) => s.filters);

  /**
   * ✅ Memoized filtered data
   * - Applies active filters to the data
   * - Recalculates only when data or filters change
   */
  const filteredData = useMemo(() => {
    if (
      !filters ||
      Object.keys(filters).every((key) => filters[key].length === 0)
    ) {
      return data; // No filters applied → return full dataset
    }

    // Return rows that match all active filters
    return data.filter((row) =>
      Object.entries(filters).every(([column, selectedValues]) => {
        if (!selectedValues.length) return true;
        return selectedValues.includes(String(row[column]));
      })
    );
  }, [data, filters]);

  /**
   * ✅ Generate column definitions dynamically
   * - Based on the keys of the first row of filtered data
   * - Memoized to avoid recalculating unnecessarily
   */
  const columns = useMemo(() => {
    if (!Array.isArray(filteredData) || filteredData.length === 0) return [];

    const keys = Object.keys(filteredData[0]);
    return keys.map((key) => ({
      name: key,
      selector: (row: Record<string, string>) => row[key],
      sortable: true,
    }));
  }, [filteredData]);

  return (
    <div className="max-w-4/5 mx-auto">
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={20}
        customStyles={customStyles}
      />
    </div>
  );
};

export default CustomDataTable;
