
import FileUploader from "./components/FileUploader";

import React, { Suspense } from "react";

const CustomDataTable = React.lazy(
  () => import("./components/CustomDataTable")
);
const DropDownContainer = React.lazy(
  () => import("./components/DropDownContainer")
);

export default function App() {
  

   
  return (
    <div className="p-6 bg-stone-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Filter Dashboard</h1>

      <FileUploader />
      <Suspense
        fallback={<div className="text-gray-500">Loading dashboard...</div>}
      >
        <DropDownContainer />
        <CustomDataTable />
      </Suspense>
    </div>
  );
}
