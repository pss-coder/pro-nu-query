import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());

export async function getSelectColumns() {
    const { data, error, isLoading } = useSWR('/api/hello', fetcher)
    console.log(data)
    return {
        data,
        error,
        isLoading
    }
}