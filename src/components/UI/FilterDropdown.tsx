import { useMemo } from "react";
import { useCsvStore } from "../../store/useCsvStore";
import Multiselect from "multiselect-react-dropdown";
import React from "react";

type FilterDropdownProps = {
  column: string;
};

const FilterDropdown =  React.memo(({ column }: FilterDropdownProps) => {
  const data = useCsvStore((s) => s.data);
  const filters = useCsvStore((s) => s.filters);
  const setFilter = useCsvStore((s) => s.setFilter);

  const selectedValues = useMemo(
    () => filters[column] || [],
    [filters, column]
  );

  const options = useMemo(() => {
    const filtered = data.filter((row) =>
      Object.entries(filters).every(([col, selected]) => {
        if (col === column || selected.length === 0) return true;
        return selected.includes(row[col]);
      })
    );

    const opts = new Set<string>();
    filtered.forEach((row) => opts.add(row[column]));
    return Array.from(opts).sort();
  }, [data, filters, column]);

  const handleChange = (selectedList: string[]) => {
    console.log("SELECTED", selectedList);
    setFilter(column, selectedList);
  };

  return (
    <div className="mb-4 w-full max-w-xs z-50">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {column}
      </label>
      <Multiselect
        options={options}
        selectedValues={selectedValues}
        onSelect={handleChange}
        onRemove={handleChange}

        isObject={false}
        style={{
          multiselectContainer: { zIndex: 9999 },
        }}
      />
    </div>
  );
})

export default FilterDropdown;
