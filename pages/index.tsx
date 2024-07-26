// #region Imports
import SearchDialog from "@/components/SearchDialog";
import {getMembers} from "@/lib/getMembers"
import { User } from "@/constants/response";
import type {
	InferGetServerSidePropsType, 
	GetServerSideProps 
} from "next";
// #endregion

export default function Home(
	{error,dataset}:InferGetServerSidePropsType<typeof getServerSideProps>
	
) {
	console.log(dataset,error)

	return (
		<>
			<main className="w-screen flex justify-start h-screen p-8">
				<SearchDialog
					// open={false}
				/>
			</main>
		</>
	);
};


export const getServerSideProps = (async ({ query }) => {

	const {company,member_details,max_results,search} = query

	try{

		const {data,error} = await getMembers([
			company as string,
			member_details as Array<keyof User>, 
			max_results as string,
			search as string
		])

		if(error)
			return({props:{
				error:true
			}})

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
}>;


