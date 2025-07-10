export interface DataRow {
  value: number;
  mod3: number;
  mod4: number;
  mod5: number;
  mod6: number;
}

export type FilterKey = keyof Omit<DataRow, "value">;

export type FilterState = {
  [K in FilterKey]: number[];
};


export type CsvRow = Record<string, string>; 