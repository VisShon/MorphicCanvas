// #region Imports
import SearchDialog from "@/components/SearchDialog";
import {getMembers} from "@/lib/getMembers"
import type {
	InferGetServerSidePropsType, 
	GetServerSideProps 
} from "next";
// #endregion

export default function Home(
	{error,dataset,type}:InferGetServerSidePropsType<typeof getServerSideProps>
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

	const {primary_filter} = query;

	const {data,error,isPending} = await getMembers([
		query.companies as string,
		query.members as string[], 
		query.fetch_options as string,
		query.search as string
	])

	if(error) return({props:{
		error:true
	}});

	return { props: { 
		dataset:data?.members,
		type:primary_filter as string,
	}};


}) satisfies GetServerSideProps<{ 
	error?:boolean,
	dataset?: {name:string}[],
	type?: string 
}>;


