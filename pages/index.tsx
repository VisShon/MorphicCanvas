// #region Imports
import SearchDialog from "@/components/SearchDialog"
import {getMembers} from "@/lib/members"
import { User } from "@/constants/response"
import sample from "@/sample.json"
import type {
	InferGetServerSidePropsType, 
	GetServerSideProps 
} from "next"
import FabricCanvas from "@/components/FabricCanvas"
// #endregion

export default function Home(
	{error,dataset}:InferGetServerSidePropsType<typeof getServerSideProps>
) {


	return (
		<>
			<main className="w-screen flex justify-center items-center h-screen p-8">
				<SearchDialog
					// open={false}
				/>
				<FabricCanvas/>
			</main>
		</>
	)
}


export const getServerSideProps = (async ({ query }) => {

	const {company,member_details,max_results,search} = query

	try{

		// const {data,error} = await getMembers([
		// 	company as string,
		// 	member_details as Array<keyof User>, 
		// 	max_results as string,
		// 	search as string
		// ])

		// if(error)
		// 	return({props:{
		// 		error:true
		// 	}})

		

		return { props: { 
			dataset:sample,
		}}
	}
	catch(e){
		return({props:{
			error:true
		}})
	}

}) satisfies GetServerSideProps<{ 
	error?:boolean,
	dataset?: {name:string}[],
	type?: string 
}>


