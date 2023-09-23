import { Container } from '@/components/Container';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Row from '@/components/Row';
import TabData from '@/components/Tab';
import { getAcidData, getAllAcidIds } from '@/lib/dbManager';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Post({acidData}) {
  return (
    <div>
    <Header />
    <Container >
      <Row data={acidData} />
    </Container>
    <br />
    <Container>
    <Link href={'/'}>Go Back Home</Link>
    </Container>
    
    {/* <Container 
      <Footer  />
    </Container> */}
    {/* <div className="w-full text-center border-t border-grey p-4 sticky bottom-0">
    <Footer />    
    </div> */}
    

    {/* <Container>
    Id: {acidData.id}
    <br />
    {acidData.length}
    <br />
    {acidData.protein_name}
    </Container> */}
    </div>
    
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