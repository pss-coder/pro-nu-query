/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Tab } from '@headlessui/react'
import useSWR from 'swr'

const tbs = [
  {
    name: 'Design',
    features: [
      {
        name: 'Adaptive and modular',
        description:
          'The Organize base set allows you to configure and evolve your setup as your items and habits change. The included trays and optional add-ons are easily rearranged to achieve that perfect setup.',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-feature-06-detail-01.jpg',
        imageAlt: 'Maple organizer base with slots, supporting white polycarbonate trays of various sizes.',
      },
    ],
  },
  {
    name: 'Material',
    features: [
      {
        name: 'Natural wood options',
        description:
          'Organize has options for rich walnut and bright maple base materials. Accent your desk with a contrasting material, or match similar woods for a calm and cohesive look. Every base is hand sanded and finished.',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-feature-06-detail-02.jpg',
        imageAlt:
          'Walnut organizer base with pen, sticky note, phone, and bin trays, next to modular drink coaster attachment.',
      },
    ],
  },
  {
    name: 'Considerations',
    features: [
      {
        name: 'Helpful around the home',
        description:
          "Our customers use Organize throughout the house to bring efficiency to many daily routines. Enjoy Organize in your workspace, kitchen, living room, entry way, garage, and more. We can't wait to see how you'll use it!",
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-feature-06-detail-03.jpg',
        imageAlt: 'Walnut organizer base with white polycarbonate trays in the kitchen with various kitchen utensils.',
      },
    ],
  },
  {
    name: 'Included',
    features: [
      {
        name: "Everything you'll need",
        description:
          'The Organize base set includes the pen, phone, small, and large trays to help you group all your essential items. Expand your set with the drink coaster and headphone stand add-ons.',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-feature-06-detail-04.jpg',
        imageAlt: 'Walnut organizer system on black leather desk mat on top of white desk.',
      },
    ],
  },
]

/**

Const tabs = [
    {name: 'Protein', data: },
    {name: 'Nucleic Acid'},
    {name: 'Complex Information'},
    {name: 'Experimental Conditions'},
    {name: 'Thermodynamic Parameters'},
]
*/


function displayProteinInfo(protein_name, protein_source,length, uniprot_id, mutation) {
    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900">Protein Name</h3>
            <p className="mt-2 text-sm text-gray-500">{protein_name}</p>

            <h3 className="mt-4 text-lg font-medium text-gray-900">Protein Source</h3>
            <p className="mt-2 text-sm text-gray-500">{protein_source}</p>

            {/* <h3 className="mt-4 text-lg font-medium text-gray-900">Sequence</h3>
            <p className="mt-2 text-sm text-gray-500">{sequence}</p> */}

            <h3 className="mt-4 text-lg font-medium text-gray-900">Length</h3>
            <p className="mt-2 text-sm text-gray-500">{length}</p>

            <h3 className="mt-4 text-lg font-medium text-gray-900">Uniprot Id</h3>
            <p className="mt-2 text-sm text-gray-500">{uniprot_id}</p>

            <h3 className="mt-4 text-lg font-medium text-gray-900">Mutation</h3>
            <p className="mt-2 text-sm text-gray-500">{mutation}</p>
        </div>
    )
}

function displayNucleicAcid(nucleic_acid_name, type_nuc) {
    return (
        <div className="mt-6 lg:col-span-5 lg:mt-0">
            <h3 className="text-lg font-medium text-gray-900">Nucleic Acid Name	</h3>
            <p className="mt-2 text-sm text-gray-500">{nucleic_acid_name}</p>

            <h3 className="text-lg font-medium text-gray-900">Nucleic Acid Type	</h3>
            <p className="mt-2 text-sm text-gray-500">{type_nuc}</p>

        </div>
    )
}

function displayExperimentalConditions(pH, temperature, method) {
    return (
        <div className="mt-6 lg:col-span-5 lg:mt-0">
            <h3 className="text-lg font-medium text-gray-900">pH</h3>
            <p className="mt-2 text-sm text-gray-500">{pH}</p>

            <h3 className="mt-4 text-lg font-medium text-gray-900">Temperature (K)</h3>
            <p className="mt-2 text-sm text-gray-500">{temperature}</p>

            <h3 className="mt-4 text-lg font-medium text-gray-900">Method</h3>
            <p className="mt-2 text-sm text-gray-500">{method}</p>

            {/* ΔG Wild type(kcal/mol) */}
        </div>
    )
}

function displayThermodynamicParameters(dG, ddG) {
    return (
        <div className="mt-6 lg:col-span-5 lg:mt-0">
            <h3 className="text-lg font-medium text-gray-900">ΔG Wild type(kcal/mol)</h3>
            <p className="mt-2 text-sm text-gray-500">{dG}</p>

            <h3 className="mt-4 text-lg font-medium text-gray-900">ΔΔG</h3>
            <p className="mt-2 text-sm text-gray-500">{ddG}</p>
        </div>
    )
}

function displayReferences(year, authors, journal) {
    return (
        <div className="mt-6 lg:col-span-5 lg:mt-0">
            <h3 className="text-lg font-medium text-gray-900">Year</h3>
            <p className="mt-2 text-sm text-gray-500">{year}</p>

            <h3 className="mt-4 text-lg font-medium text-gray-900">Authors</h3>
            <p className="mt-2 text-sm text-gray-500">{authors}</p>

            <h3 className="mt-4 text-lg font-medium text-gray-900">Journal</h3>
            <p className="mt-2 text-sm text-gray-500">{journal}</p>
        </div>
    )
}

function getSequence(xml) {
  const DomParser = new DOMParser()
  let XMLparsed = DomParser.parseFromString( xml, 'application/xml')
  const sequences = XMLparsed.querySelectorAll('sequence')
  const sq = sequences[sequences.length - 1]
  // console.log(sq.innerHTML)
  // console.log(sq.getAttribute('length'))
  // console.log(sq.getAttribute('mass'))

  return (
    <>
      <h3 className="mt-4 text-lg font-medium text-gray-900">Sequence - retrieved from UniProt</h3>
      <p className="mt-2 text-sm text-gray-500 break-all">{sq.innerHTML}</p>
    </>
  )
}



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Row({acid}) {
  // console.log(sequence)
  const fetcher = (url) => fetch(url).then((res) => res.json());
  console.log(`/api/uniprot?uniprotid=${acid.uniprot_id}`)

  const {data, error, isLoading} = useSWR(`/api/uniprot?uniprotid=${acid.uniprot_id}`, fetcher)

    const [tabs, setTabs] = useState(
        [
          {name: 'Protein'},
          {name: 'Nucleic Acid'},
          // {name: 'Complex Information'},
          {name: 'Experimental Conditions'},
          {name: 'Thermodynamic Parameters'},
          {name: 'References'},
        ]
      )



  return (
    <div className="bg-white">
      <section aria-labelledby="features-heading">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
          <div className="max-w-3xl">
            {/* <h2 id="features-heading" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Technical Specifications
            </h2>
            <p className="mt-4 text-gray-500">
              The Organize modular system offers endless options for arranging your favorite and most used items. Keep
              everything at reach and in its place, while dressing up your workspace.
            </p> */}
            {/* {isLoading && <>isLoading: {isLoading}</>}
            {error && <>error: {error}</>}
            { data && <>{getSequence(data.data)}</>} */}
          </div>

          <Tab.Group as="div" className="mt-4">
            <div className="-mx-4 flex overflow-x-auto sm:mx-0">
              <div className="flex-auto border-b border-gray-200 px-4 sm:px-0">
                <Tab.List className="-mb-px flex space-x-10">
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                          'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                        )
                      }
                    >
                      {tab.name}
                    </Tab>
                  ))}
                </Tab.List>
              </div>
            </div>

            <Tab.Panels as={Fragment}>
              {tabs.map((tab, index) => (
                <Tab.Panel key={tab.name} className="space-y-16 pt-10 lg:pt-16">
                    {/* <div>
                        {tab.view}
                    </div> */}
                    
                    <div key={tab.name + index} className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8">

                        {tab.name == 'Protein' && <div className="mt-6 lg:col-span-5 lg:mt-0">
                        {displayProteinInfo(acid.protein_name.join(', '), acid.protein_source, acid.length, acid.uniprot_id, acid.mutation_protein)}

                        {data && getSequence(data.data) }
                        </div> 
                        }
                        {tab.name == 'Nucleic Acid' && <> {displayNucleicAcid(acid.nucleic_acid_name, acid.type_nuc)}</>}
                        {tab.name == 'Experimental Conditions' && <>{displayExperimentalConditions(acid.pH, acid.temperature, acid.method)}</>}
                        {tab.name == 'Thermodynamic Parameters' && <>{displayThermodynamicParameters(acid.dG_wild_kcal_mol_, acid.ddG)}</>}
                        {tab.name == 'References' && <>{displayReferences(acid.year, acid.authors, acid.journal)}</>}

                    </div>

                    


                  {/* {tab.view.map((feature) => (
                    <div key={feature.name} className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8">
                      <div className="mt-6 lg:col-span-5 lg:mt-0">
                        <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                        <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
                      </div>
                      <div className="lg:col-span-7">
                        <div className="aspect-h-1 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:aspect-h-2 sm:aspect-w-5">
                          <img src={feature.imageSrc} alt={feature.imageAlt} className="object-cover object-center" />
                        </div>
                      </div>
                    </div>
                  ))} */}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </div>
  )
}
