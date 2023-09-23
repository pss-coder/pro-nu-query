import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon, BarsArrowUpIcon, UsersIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import Link from 'next/link'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ComboBox({ className, ...props }) {
  const [query, setQuery] = useState('')

  var filtered =
    query === ''
      ? props.comboBox
      : props.comboBox.filter((value) => {
          return value.search.toLowerCase().includes(query.toLowerCase())
  })

  return (
    <Combobox className={clsx('', className)} as="div" value={props.selected} onChange={props.setSelected}>
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">{props.label}</Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          name='value'
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          displayValue={(text) => text}
          onChange={(event) => setQuery(event.target.value)}
          placeholder='text here'
        />

        <Combobox.Button className="absolute inset-y-0 right-10 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md  focus:outline-none">
            {/* <Link
            href={{
              pathname: '/results',
              query: {
                column: props.column.name,
                colindex: props.column.id-1, // get colindex not id => index = id - 1
                // valindex: props.selected.id,
                value: props.selected
              }
            }}
          type="button"
          className="relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <BarsArrowUpIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Link> */}
        </div>

       
        {filtered.length > 0 && (
          <Combobox.Options 
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filtered.map((value) => (
              <Combobox.Option
                key={value.id}
                value={value.search}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>{value.search}</span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}

      </div>
    </Combobox>
  )
}
