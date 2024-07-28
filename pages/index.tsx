// #region Imports
import SearchDialog from "@/components/SearchDialog"
import {getMembers} from "@/lib/members"
import { User } from "@/constants/response"
import type {
	InferGetServerSidePropsType, 
	GetServerSideProps 
} from "next"
import FabricCanvas from "@/components/FabricCanvas"
import VerticalPanel from "@/components/VerticalPanel"
import TextMenu from "@/components/TextMenu"
import { useMemo } from "react"
// #endregion

export default function Home(
	{error,dataset}:InferGetServerSidePropsType<typeof getServerSideProps>
) {

	console.log(dataset)
	const memoizedUsers = useMemo(()=>dataset,[dataset])

	return (
		<>
			<main className="w-screen flex justify-center items-center h-screen p-8 overflow-clip ">
				<SearchDialog
					open={false}
					users={memoizedUsers}
				/>

				<FabricCanvas/>
				<VerticalPanel/>
				<TextMenu/>
			</main>
		</>
	)
}


export const getServerSideProps = (async ({ query }) => {

	const {
		company,
		member_details,
		page
	} = query

	try{

		const {data,error} = await getMembers([
			company as string,
			member_details as Array<keyof User>, 
			page as string,
		])

		if(error){
			return({props:{
				error:true
			}})
		}

		return { props: { 
			dataset:data,
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


