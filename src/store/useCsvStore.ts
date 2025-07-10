import type { CsvRow } from "./../../types/index";
import { create } from "zustand";

// Zustand store for managing CSV data and column filters
interface CsvState {
  data: CsvRow[]; // Parsed CSV data
  filters: Record<string, string[]>; // Active filters per column

  setData: (data: CsvRow[]) => void; // Set full CSV data
  setFilter: (column: string, values: string[]) => void; // Set filter for a column
  clearFilters: () => void; // Reset all filters

  getAvailableOptionsForColumn: (column: string) => string[]; // Get filtered unique values for a column
}

export const useCsvStore = create<CsvState>((set, get) => ({
  data: [],
  setData: (data) => set({ data }),

  filters: {},
  setFilter: (column, values) =>
    set((state) => ({
      filters: { ...state.filters, [column]: values },
    })),

  clearFilters: () => set({ filters: {} }),

  getAvailableOptionsForColumn: (targetColumn) => {
    const { data, filters } = get();

    // Filter data based on all filters except the target column
    const filtered = data.filter((row) =>
      Object.entries(filters).every(([column, selectedValues]) => {
        if (column === targetColumn || !selectedValues.length) return true;
        return selectedValues.includes(String(row[column]));
      })
    );

    // Extract unique values from the target column
    const options = new Set<string>();
    filtered.forEach((row) => {
      options.add(row[targetColumn]);
    });

    return Array.from(options).sort();
  },
}));
