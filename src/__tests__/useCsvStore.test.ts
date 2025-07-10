import { act } from "react-dom/test-utils";
import { useCsvStore } from "../store/useCsvStore";

// ✅ Vitest-specific imports
import { describe, it, expect, beforeEach } from "vitest";

describe("useCsvStore Zustand Store", () => {
  beforeEach(() => {
    // Reset Zustand store before each test
    useCsvStore.setState({ data: [], filters: {} });
  });

  it("should set data correctly", () => {
    const testData = [
      { name: "Nike", category: "Shoes" },
      { name: "Adidas", category: "Shoes" },
    ];

    act(() => {
      useCsvStore.getState().setData(testData);
    });

    const state = useCsvStore.getState();
    expect(state.data).toHaveLength(2);
    expect(state.data[0].name).toBe("Nike");
  });

  it("should set and apply filters", () => {
    const testData = [
      { name: "Nike", category: "Shoes" },
      { name: "Levi’s", category: "Clothing" },
    ];

    act(() => {
      useCsvStore.getState().setData(testData);
      useCsvStore.getState().setFilter("category", ["Shoes"]);
    });

    const state = useCsvStore.getState();
    expect(state.filters.category).toEqual(["Shoes"]);
  });

  it("should return correct available options for a column", () => {
    const testData = [
      { name: "Nike", category: "Shoes" },
      { name: "Levi’s", category: "Clothing" },
      { name: "Adidas", category: "Shoes" },
    ];

    act(() => {
      useCsvStore.getState().setData(testData);
      useCsvStore.getState().setFilter("category", ["Shoes"]);
    });

    const options = useCsvStore.getState().getAvailableOptionsForColumn("name");

    expect(options).toContain("Nike");
    expect(options).toContain("Adidas");
    expect(options).not.toContain("Levi’s");
  });

  it("should clear all filters", () => {
    act(() => {
      useCsvStore.getState().setFilter("category", ["Clothing"]);
      useCsvStore.getState().clearFilters();
    });

    const state = useCsvStore.getState();
    expect(state.filters).toEqual({});
  });
});
