import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Head from 'next/head'
import { Container } from '@/components/Container'
import Select from '@/components/Select'
import Combobox from '@/components/ComboBox'
import { useEffect, useState } from 'react'
import { getColData, getColumns } from '@/lib/dbManager'

export default function Home() {

  const columns = getColumns()
  const [selected, setSelected] = useState(columns[0])
  const [comboBox, setComboBox] = useState([{id:0, search:''}])
  const [selectedComboBox, setSelectedComboBox] = useState(null)
  
  function updateSelect(value) {
    setSelected(value)
  }

  // Updates ComboBox Data based on selected option
  useEffect(() => {
    if(selected) {
      getColData(selected.name)
        .then((res) => res.json())
        .then(data => {
          if (data) {
            setComboBox(data.data)
          }
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

        <div className="flex shadow-md rounded-md flex-col justify-center p-4 sm:flex-row md:flex-col lg:flex-row">
          {selected && <Select className="mb-2 sm:mr-2 sm:mb-0" columns={columns} selected={selected} updateSelect={updateSelect} />}
          {/* TODO: Add error validation <- missing field do nothing */}
          {comboBox && <Combobox className="flex-1 mb-2 sm:ml-2 sm:mb-0" comboBox={comboBox} column={selected.name} selected={selectedComboBox} setSelected={setSelectedComboBox}/>}  
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
