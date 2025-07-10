import React, { useState } from 'react'
import { BiPlus } from 'react-icons/bi';
import { parseCsvFile } from '../utils/parseCsv';


const FileUploader = () => {
    const [fileUploaded, setFileUploaded] = useState<boolean>(false);

    const [error, setError] = useState<string | null>(null);
    
    const handleFileChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            try {
                await parseCsvFile(file);
                setFileUploaded(true);   
               
            } catch (error) {
                setFileUploaded(false);   
                setError((error as Error).message);
               
            }
        }
    }


  return (
    <>
          <div className="max-w-lg mx-auto flex flex-col items-center justify-center border-2 border-dashed border-stone-500 p-4 group hover:border-gray-800">
              
        <label
          htmlFor="fileInput"
          className="text-2xl text-gray-700 group-hover:text-gray-900 cursor-pointer flex items-center"
        >
          {fileUploaded ? (
            "File Uploaded ✔️"
          ) : (
            <>
              <BiPlus className="mr-1" />
              Upload your file
            </>
          )}
              </label>
              
         {/* main Input       */}
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          id="fileInput"
          className="hidden"
        />
          </div>
      {/* printing error if something goes wrong while parsing  */}
      {error && <h5 className="text-red-500">Failed to parse file: {error}</h5>}
    </>
  );
}

export default FileUploader