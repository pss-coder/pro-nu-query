import Header from '@/components/Header'
import Head from 'next/head'
import { Container } from '@/components/Container'
import SearchField from '@/components/SearchField'
import Link from 'next/link'
import { TypeAnimation } from 'react-type-animation';
import Footer from '@/components/Footer'


export default function Home() {
  return (
    <>
      <Head>
        <title>ProNuQuery</title>
      </Head>
      
      <div className="flex flex-col min-h-screen"> {/* Use a div wrapper with flex and flex-col */}
      <Header />
      <main className='flex-grow'>
        <Container className="pt-20 pb-16 text-center lg:pt-32">
          <TypeAnimation speed={200} className="text-3xl font-semibold text-indigo-700 mb-4"
            sequence={['Welcome to ProNuQuery!',500]} />
          <SearchField columnIndex={0} value={null} />
        </Container>

        <Container className="text-center">
      <Link
        href="/advancedsearch"
        type="button"
        className="rounded-md bg-indigo-50 m-5 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      >
        Advanced Search
      </Link>

      <Link
        href="/viewall"
        type="button"
        className="rounded-md bg-indigo-50 m-5 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      >
        View All Data
      </Link>
      </Container>

      
      </main>

      <Footer />
      </div>
      
    </>
  )
}
