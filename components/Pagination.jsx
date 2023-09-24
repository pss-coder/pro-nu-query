import { useState } from "react"

const items = [
    { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
    { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
    { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
  ]
  
//   TODO: FIX numbering issue
  export default function Pagination({page, setPage, length, total}) {
    // const [totalPages, setTotalPages] = useState(Math.ceil(total/length))
    console.log(length, total)

    const totalPages = Math.ceil(total / length);
    
    var startIndex, endIndex;
    var disableFront = false
    if(length >= 10) {
      startIndex = page * length + 1;
      endIndex = Math.min(startIndex + length - 1, total);
      disableFront = false
    } else {
      //51 - 1 = 50
      startIndex = total - length
      endIndex = total
      disableFront = true
    }
    

    return (
      <nav
        className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIndex}</span> to <span className="font-medium">{endIndex}</span> of{' '}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
        {page > 0 && <button
            onClick={() => page > 0 ? setPage(page - 1) : null}
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
            disabled={page === 0}
          >
            Previous
          </button>}
          

          {!disableFront && <button
          onClick={() => setPage(page + 1)}
            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
            disabled={disableFront}

          >
            Next
          </button>}
          
        </div>
      </nav>
    )
  }
  