import Papa from "papaparse";
import { useCsvStore } from "../store/useCsvStore";

// Type for a row in your CSV (update keys if needed)
export type CsvRow = Record<string, string>;

export const parseCsvFile = async (file: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      worker: true, // ✅ non-blocking
      complete: (results) => {
        const { data } = results;

        // Check type safety of parsed data
        if (!Array.isArray(data)) {
          reject(new Error("Parsed data is not an array"));
          return;
        }

        const typedData = data as CsvRow[];

        // Optional: Clean up rows with undefined keys
        const cleanedData = typedData.filter((row) =>
          Object.values(row).some((v) => v !== undefined && v !== null)
        );

        useCsvStore.getState().setData(cleanedData);
        resolve();
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
        reject(error);
      },
    });
  });
};
