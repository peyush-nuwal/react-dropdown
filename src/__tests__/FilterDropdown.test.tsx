import { describe, it, beforeEach, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import FilterDropdown from "../components/UI/FilterDropdown";
import { useCsvStore } from "../store/useCsvStore";

// 🧪 Mock multiselect-react-dropdown (so we can test interaction easily)
vi.mock("multiselect-react-dropdown", () => ({
  default: ({ options, selectedValues, onSelect }: any) => (
    <select
      multiple
      data-testid="mock-multiselect"
      value={selectedValues}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = Array.from(e.target.selectedOptions).map(
          (o) => o.value
        );
        onSelect(selected);
      }}
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  ),
}));

describe("FilterDropdown", () => {
  beforeEach(() => {
    useCsvStore.setState({
      data: [],
      filters: {},
      setData: () => {},
      setFilter: vi.fn(),
      clearFilters: () => {},
      getAvailableOptionsForColumn: () => [],
    });
  });

  it("renders label and options for column", () => {
    const data = [
      { brand: "Nike", category: "Shoes" },
      { brand: "Adidas", category: "Shoes" },
      { brand: "Levi's", category: "Clothing" },
    ];

    useCsvStore.setState((prev) => ({
      ...prev,
      data,
      filters: {},
    }));

    render(<FilterDropdown column="category" />);

    // @ts-ignore
    expect(screen.getByText("category")).toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByTestId("mock-multiselect")).toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByText("Shoes")).toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByText("Clothing")).toBeInTheDocument();
  });

  it("calls setFilter on selection change", async () => {
    const mockSetFilter = vi.fn();

    const data = [
      { brand: "Nike", category: "Shoes" },
      { brand: "Adidas", category: "Shoes" },
      { brand: "Levi's", category: "Clothing" },
    ];

    useCsvStore.setState((prev) => ({
      ...prev,
      data,
      filters: {},
      setFilter: mockSetFilter,
    }));

    render(<FilterDropdown column="category" />);

    const select = screen.getByTestId("mock-multiselect") as HTMLSelectElement;
    const option = screen.getByText("Shoes") as HTMLOptionElement;

    // Simulate user selecting "Shoes"
    option.selected = true;
    select.dispatchEvent(new Event("change", { bubbles: true }));

    expect(mockSetFilter).toHaveBeenCalledWith("category", ["Shoes"]);
  });
});
