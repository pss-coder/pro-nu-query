import { getAcidData, getAllAcidIds } from '@/lib/acid';

export default function Post({acidData}) {
  return (
    <div >
    Id: {acidData.id}
    <br />
    {acidData.length}
    <br />
    {acidData.protein_name}
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
    const data = await (await getAcidData(params.id)).dt
    const acidData = JSON.parse(data)[0]
    
    console.log(acidData)
    return {
      props: {
        acidData,
      },
    };
  }