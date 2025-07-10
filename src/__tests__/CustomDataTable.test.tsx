import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useCsvStore } from "../store/useCsvStore";
import CustomDataTable from "../components/CustomDataTable";

// Mock Zustand store before each test to ensure fresh state
beforeEach(() => {
  useCsvStore.setState({
    data: [],
    filters: {},
    setData: () => {},
    setFilter: () => {},
    clearFilters: () => {},
    getAvailableOptionsForColumn: () => [],
  });
});

describe("CustomDataTable", () => {
  it("renders with no data", () => {
    render(<CustomDataTable />);
    // @ts-ignore
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders table rows based on filtered data", () => {
    const testData = [
      { name: "Nike", category: "Shoes" },
      { name: "Levi’s", category: "Clothing" },
    ];

    // Set store state manually
    useCsvStore.setState({
      ...useCsvStore.getState(),
      data: testData,
      filters: { category: ["Shoes"] },
    });

    render(<CustomDataTable />);

    // Nike should appear
    // @ts-ignore
    expect(screen.getByText("Nike")).toBeInTheDocument();
    // Levi’s should not appear (filtered out)
    // @ts-ignore
    expect(screen.queryByText("Levi’s")).not.toBeInTheDocument();
  });

  it("renders all data when no filters applied", () => {
    const testData = [
      { name: "Nike", category: "Shoes" },
      { name: "Levi’s", category: "Clothing" },
    ];

    useCsvStore.setState({
      ...useCsvStore.getState(),
      data: testData,
      filters: {},
    });

    render(<CustomDataTable />);
    // @ts-ignore
    expect(screen.getByText("Nike")).toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByText("Levi’s")).toBeInTheDocument();
  });
});
