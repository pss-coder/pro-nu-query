import { Container } from '@/components/Container';
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
    <Row data={acidData} />

    {/* <Container>
    Id: {acidData.id}
    <br />
    {acidData.length}
    <br />
    {acidData.protein_name}
    </Container> */}

    <Link href={'/'}>Go Back Home</Link>

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