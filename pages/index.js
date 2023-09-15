import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Head from 'next/head'
import { Container } from '@/components/Container'

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
        <input type='text' placeholder='search here' />
      </Container>

      </main>
    </>
   
  )
}
