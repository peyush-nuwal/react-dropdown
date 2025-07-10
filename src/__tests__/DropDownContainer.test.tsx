import { describe, it, beforeEach, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useCsvStore } from "../store/useCsvStore";
import DropDownContainer from "../components/DropDownContainer";

// Mock child component to isolate test
vi.mock("../components/UI/FilterDropdown", () => ({
  default: ({ column }: { column: string }) => <div>{column} Dropdown</div>,
}));

describe("DropDownContainer", () => {
  beforeEach(() => {
    useCsvStore.setState({
      data: [],
      filters: {},
      setData: () => {},
      setFilter: () => {},
      clearFilters: vi.fn(),
      getAvailableOptionsForColumn: () => [],
    });
  });

  it("does not render when data is empty", () => {
    render(<DropDownContainer />);
    expect(screen.queryByText(/Dropdown/i)).not.toBeInTheDocument();
  });

  it("renders dropdowns for each column", () => {
    const testData = [
      { name: "Nike", category: "Shoes" },
      { name: "Adidas", category: "Shoes" },
    ];

    useCsvStore.setState((prev) => ({
      ...prev,
      data: testData,
    }));

    render(<DropDownContainer />);

    expect(screen.getByText("name Dropdown")).toBeInTheDocument();
    expect(screen.getByText("category Dropdown")).toBeInTheDocument();
  });

  it("shows Clear Filter button when data exists and triggers clear", () => {
    const clearFiltersMock = vi.fn();

    useCsvStore.setState((prev) => ({
      ...prev,
      data: [
        { name: "Nike", category: "Shoes" },
        { name: "Adidas", category: "Shoes" },
      ],
      clearFilters: clearFiltersMock,
    }));

    render(<DropDownContainer />);

    const clearBtn = screen.getByText(/Clear Filter/i);
    expect(clearBtn).toBeInTheDocument();

    fireEvent.click(clearBtn);
    expect(clearFiltersMock).toHaveBeenCalledTimes(1);
  });
});
