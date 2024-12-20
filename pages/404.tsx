// #region Imports
import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
// #endregion


function NotFound() {
	return (
		<>
			<Head>
				<title>404 | Morphic</title>
				<meta name="description" content="Vishnu Shon" />
			</Head>
			
			<main className="w-screen h-screen flex flex-col justify-center items-center gap-5">

				<p className="flex gap-2 text-charcoal font-normal mb-10">
					No, no, no nothing&apos;s here,
					<Link
						className="text-blue-main"
						href={"/"}		
					> 
					let&apos;s go home
					</Link>
				</p>
			</main>
		</>
	)
}

export default NotFound