import Header from '@/components/Header'
import Head from 'next/head'
import { Container } from '@/components/Container'
import SearchField from '@/components/SearchField'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
      <title>ProNuQuery</title>
      </Head>
      <Header />
      <main>

      {/* TODO: place into a searchFieldComponent */}
      <Container className="pt-20 pb-16 text-center lg:pt-32">
        <SearchField columnIndex={0} value={null}/>
      </Container>

      {/* TODO: Version 3 */}
      <Container className="text-center">
      <Link
        href="/advancedsearch"
        type="button"
        className="rounded-md bg-indigo-50 m-5 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      >
        Advanced Search
      </Link>

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
