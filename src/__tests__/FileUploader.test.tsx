
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock the actual module and get reference to the mock function
vi.mock("../utils/parseCsv", () => {
  return {
    parseCsvFile: vi.fn(),
  };
});

// Now import the mocked function
import { parseCsvFile } from "../utils/parseCsv";
import FileUploader from "../components/FileUploader";

describe("FileUploader component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders upload prompt initially", () => {
    render(<FileUploader />);
    // @ts-ignore
    expect(screen.getByText("Upload your file")).toBeInTheDocument();
  });

  it("shows success message when file is uploaded and parsed", async () => {
    // ✅ Fix: Use `vi.fn()` mock
    (parseCsvFile as ReturnType<typeof vi.fn>).mockResolvedValueOnce(undefined);

    render(<FileUploader />);

    const input = screen.getByLabelText("Upload your file") as HTMLInputElement;

    const file = new File(["name,age\nJohn,30"], "test.csv", {
      type: "text/csv",
    });

    // Fire the input change event
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      // @ts-ignore
      expect(screen.getByText("File Uploaded ✔️")).toBeInTheDocument();
    });
  });

  it("shows error message if parsing fails", async () => {
    (parseCsvFile as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Parsing error")
    );

    render(<FileUploader />);

    const input = screen.getByLabelText("Upload your file") as HTMLInputElement;

    const file = new File(["bad,data"], "bad.csv", { type: "text/csv" });

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      // @ts-ignore
      expect(screen.getByText(/Failed to parse file/i)).toBeInTheDocument();
    });
  });
});

