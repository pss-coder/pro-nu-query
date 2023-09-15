import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Head from 'next/head'
import { Container } from '@/components/Container'
import Select from '@/components/Select'
import Combobox from '@/components/ComboBox'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
          <Select className="mb-2 sm:mr-2 sm:mb-0" />
          <Combobox className="flex-1 mb-2 sm:ml-2 sm:mb-0" />
          {/* <span className="relative mt-2 rounded-md border-0 bg-white py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-base">
            First and last name
          </span> */}
          
          {/* <button type="button"
                  className='rounded-md mt-2 bg-indigo-50 px-3  text-sm font-semibold ml-5 text-indigo-600 shadow-sm hover:bg-indigo-100'
                  // className="rounded-md bg-indigo-50 m-5 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                  >
                  Enter
            </button> */}
        </div>

      </Container>

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
