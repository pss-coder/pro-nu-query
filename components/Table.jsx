import { EyeIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useState } from "react";

  
  export default function Table({results}) {
    const [columnVisibility, setColumnVisibility] = useState({
      id: true,
      protein_name: true,
      protein_source: true,
      length: true,
      uniprot_id: true,
      nucleic_acid_name: true,
    });
  
    const toggleColumnVisibility = (column) => {
      setColumnVisibility((prevState) => ({
        ...prevState,
        [column]: !prevState[column],
      }));
    };


    return (
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          {/* <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Table Results</h1>
            <p className="mt-2 text-sm text-gray-700">
              Table Description here
            </p>
          </div> */}
                  {/* Add a checkbox group here */}
          <div className="space-x-4">
          {Object.keys(columnVisibility).map((column) => (
            <div key={column} className="flex items-center">
              <input
                type="checkbox"
                id={column}
                name="columnVisibility"
                checked={columnVisibility[column]}
                onChange={() => toggleColumnVisibility(column)}
                className="mr-2"
              />
              <label htmlFor={column}>{column}</label>
            </div>
          ))}
        </div>

        </div>
        <div className="-mx-4 mt-8 sm:-mx-0">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
              {columnVisibility.id && (
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  ID
                </th>
              )}
                <th
                  scope="col"
                  className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  protein_name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  protein_source
                </th>
                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                length
                </th>
                {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">uniprot_id</span>
                </th> */}
                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                uniprot_id
                </th>
                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                nucleic_acid_name
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {results.map((row) => (
                <tr key={row.id} className="hover:bg-gray-100">
                {columnVisibility.id && (
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                    <Link
                      href={"/acids/" + row.id}
                      className="text-indigo-600 hover:text-grey-900 underline"
                    >
                      {row.id}
                    </Link>
                    
                    {/* For mobile-view */}
                    {/* <dl className="font-normal lg:hidden">
                      <dt className="sr-only sm:hidden">
                        {row.protein_name}
                      </dt>
                    </dl> */}
                  </td>
                )}

                  {/* <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{row.id}</td> */}
                  <td className="px-3 py-4 text-sm text-gray-500 sm:table-cell">{row.protein_name.join(', ')}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">{row.protein_source}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">{row.length}</td>
                  <td className="px-3 py-4 text-sm text-blue-500 underline">
                  {/* TODO: update classname for UI */}
                    <Link href={{
                      pathname: `https://www.uniprot.org/uniprotkb/${row.uniprot_id}/entry`
                    }} rel="noopener noreferrer" target="_blank">
                      {row.uniprot_id}
                    </Link>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">{row.nucleic_acid_name}</td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    {/* <a href="#" className="text-indigo-600 hover:text-indigo-900">
                      Edit<span className="sr-only">, {row.id}</span>
                    </a> */}
                    {/* className="-ml-0.5 h-5 w-5 text-gray-400" */}
                    <Link href={'/acids/'+row.id} className="text-indigo-600 hover:text-grey-900 underline">
                        <EyeIcon className="h-5 w-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  