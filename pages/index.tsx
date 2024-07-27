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
import NameCard from "@/components/NameCard"
import VerticalPanel from "@/components/VerticalPanel"
// #endregion

export default function Home(
	{error,dataset}:InferGetServerSidePropsType<typeof getServerSideProps>
) {

	console.log(dataset)


	return (
		<>
			<main className="w-screen flex justify-center items-center h-screen p-8 overflow-clip">
				<SearchDialog
					open={false}
				/>
				<FabricCanvas
					users={dataset}
				/>
				<VerticalPanel/>

				{dataset?.map((user:any,i:number)=>
					<NameCard
						avatar_url={user.avatar_url}
						name={user.name}
						login={user.login}
						bio={user.bio}
						email={user.email}
						followers={user.followers}
						public_repos={user.public_repos}
						public_gists={user.public_gists}
					/>
				)}
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


