import Link from "next/link";

export default function Custom404() {
    return (
        <>
            <h1>404 - Result Not Found</h1>
            <Link href={'/'} >Go back Home</Link>
        </>
    )
  }