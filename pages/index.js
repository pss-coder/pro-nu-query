import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Head from 'next/head'
import { Container } from '@/components/Container'
import Select from '@/components/Select'
import Combobox from '@/components/ComboBox'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const columns = [
  { id: 1, name: 'protein_name' },
  { id: 2, name: 'protein_source' },
  { id: 3, name: 'nucleic_acid_name' },
  { id: 4, name: 'type_nuc' },
  { id: 5, name: 'method' },
  { id: 6, name: 'journal' },
]

export default function Home() {
  // useState -> for select dropdown
  // useState -> for column data <- dependent on the select dropdown

  const [selected, setSelected] = useState(columns[0])

  const [comboBox, setComboBox] = useState([{id:0, search:''}])

  function updateSelect(value) {
    setSelected(value)
  }

  // function onComboBoxField(input) {
  //   console.log(input)
  // }

  function search(text) {
    console.log(selected.name)
    console.log(text)

    var query = new URLSearchParams({
      column: selected.name,
      value: text
    })

    fetch("/api/acids/?"+query.toString())
    .then((res) => res.json())
    .then(data => {
      // Update Combobox Data
      console.log(data)
    })
  }

// Updates ComboBox Data based on selected option
useEffect(() => {
  if(selected) {
    fetch("/api/hello/?name="+selected.name)
    .then((res) => res.json())
    .then(data => {
      // Update Combobox Data
      setComboBox(data.data)
    })
  }
  

}, [selected]) 

  return (
    <>
      <Head>
      <title>ProNuQuery</title>
      </Head>
      <Header />
      <main>

      <Container className="pt-20 pb-16 text-center lg:pt-32">
        {/* TODO: put in a component?? */}
        <div className="flex shadow-md rounded-md flex-col justify-center p-4 sm:flex-row md:flex-col lg:flex-row">
          {/* TODO: get data from select and pass to combobox to display */}
          {/* get text from combobox and pass to query */}
          {selected && <Select className="mb-2 sm:mr-2 sm:mb-0" columns={columns} selected={selected} updateSelect={updateSelect} />}

          {comboBox && <Combobox className="flex-1 mb-2 sm:ml-2 sm:mb-0" comboBox={comboBox} search={search}/>}
          
        </div>
      </Container>




      {/* TODO: Version 2 */}
      <Container className="text-center">
      <button
        type="button"
        className="rounded-md bg-indigo-50 m-5 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      >
        Advanced Search
      </button>

      <button
        type="button"
        className="rounded-md bg-indigo-50 m-5 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      >
        View All Data
      </button>
      </Container>

      </main>
    </>
   
  )
}
