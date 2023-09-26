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
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Display Options:</h1>
            {/* <p className="mt-2 text-sm text-gray-700">
              Table Description here
            </p> */}
          </div>
                  {/* Add a checkbox group here */}
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {Object.keys(columnVisibility).map((column) => (
            <li key={column} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div  className="flex items-center pl-4">
              <input
                type="checkbox"
                id={column}
                name="columnVisibility"
                checked={columnVisibility[column]}
                onChange={() => toggleColumnVisibility(column)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label htmlFor={column}
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >{column}</label>
            </div>
            </li>
          ))}
        </ul>

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
              {columnVisibility.protein_name && (
                <th
                  scope="col"
                  className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  protein_name
                </th>
                )}
                {columnVisibility.protein_source && (
                <th
                  scope="col"
                  className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  protein_source
                </th>
                )}
                {columnVisibility.length && (
                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                length
                </th>
                )}
                {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">uniprot_id</span>
                </th> */}
                {columnVisibility.uniprot_id && (
                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                uniprot_id
                </th>
                )}
                {columnVisibility.nucleic_acid_name && (
                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                nucleic_acid_name
                </th>
                )}
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
                  {columnVisibility.protein_name && (
                    <td className="px-3 py-4 text-sm text-gray-500 sm:table-cell">{row.protein_name.join(', ')}</td>
                  )}
                  
                  {columnVisibility.protein_source && (
                    <td className="px-3 py-4 text-sm text-gray-500">{row.protein_source}</td>
                  )}

                  {columnVisibility.length && (
                    <td className="px-3 py-4 text-sm text-gray-500">{row.length}</td>
                  )}
                  
                  {columnVisibility.uniprot_id && (
                    <td className="px-3 py-4 text-sm text-blue-500 underline">
                  {/* TODO: update classname for UI */}
                    <Link href={{
                      pathname: `https://www.uniprot.org/uniprotkb/${row.uniprot_id}/entry`
                    }} rel="noopener noreferrer" target="_blank">
                      {row.uniprot_id}
                    </Link>
                  </td>
                  )}


                 {columnVisibility.nucleic_acid_name && (
                  <td className="px-3 py-4 text-sm text-gray-500">{row.nucleic_acid_name}</td>
                 )}
                  
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
  