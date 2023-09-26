import { Container } from '@/components/Container';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Row from '@/components/Row';
import TabData from '@/components/Tab';
import { getAcidData, getAllAcidIds, getSequence } from '@/lib/dbManager';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';



export default function Post({acidData}) {
  

  return (
    <>
    <Head>
      <title>ProNuQuery</title>
    </Head>
      
      <div className="flex flex-col min-h-screen">
        <main className='flex-grow'>
        <Header />
        <Container >
          <Row acid={acidData}/>
        </Container>
          <br />
        <Container>
          <Link href={'/'}>Go Back Home</Link>
        </Container>
        </main>
    
      <Footer />
    </div>
    </>
    
    
  );
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = await getAllAcidIds()
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const data = (await getAcidData(params.id)).dt
    const acidData = JSON.parse(data)
    
    return {
      props: {
        acidData,
      },
    };
  }