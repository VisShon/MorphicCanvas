import axios from "axios";

export const getMembers = async(
	[company,filterset,max,search]:[string,string[],string,string]
):Promise<{
		data:any,
		error:unknown|undefined,
		isPending:boolean,
	}>=>{

	
	let isPending = true

	if(!company)
		return {
			data:undefined,
			error:"No company",
			isPending:false
		} 

	if(!max)
		max = "50"


	try {

		let data

		const {data:members} = await axios.get(`https://api.github.com/orgs/${company}/members`,{
			params:{
				per_page:max,
				// page:1
			}
		})


		if(filterset.includes("about"))
			data = members


		if(filterset.includes("public_repos"))
			data = members.map(async(member:any,i:number)=>{
				const{data:repos} =  await axios.get(member.repos_url)
				return {
					...member,
					repos
				}
			})

		if(filterset.includes("public_gists"))
			data = members.map(async(member:any,i:number)=>{
				const{data:gists} =  await axios.get(member.gists_url)
				return {
					...member,
					gists
				}
			})

		if(filterset.includes("organizations"))
			data = members.map(async(member:any,i:number)=>{
				const{data:orgs} =  await axios.get(member.organizations_url)
				return {
					...member,
					orgs
				}
			})

		return {
			data,
			error:undefined,
			isPending:false
		}
		
	}
	catch(error:unknown){
		return {
			data:undefined,
			error,
			isPending
		}
		
	}
};